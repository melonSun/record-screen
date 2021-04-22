import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { SessionEntity } from '../../entity/session.entity';
import { SessionService } from '../service/session.service'
import { EventService } from '../../event/service/event.service'
import { UserService } from '../../user/service/user.service'

@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly eventService: EventService,
    private readonly userService: UserService 
    ) {}

  @Post('/create')
  async create(@Query() query, @Body() body): Promise<any> {
    const { events, id,  ...others } = body;
    const sessionId = body.id;
    const { username, nickname } = query;

    // 处理用户信息
    let user = await this.userService.getUser(username);
    if (!user) {
      user = await this.userService.create({nickname, username});
    }
    const userId = user.username;

    let res:any = {};
    if (sessionId) {
      const session = await this.sessionService.getSession({id: sessionId});
      const { id, start_time, end_time, ...defaultValues } = session;

      if (events && events.length > 0) {
        if (events[events.length - 1].timestamp - start_time > 1000 * 60 * 20) { // 20分以内生成一个session
          // this.sessionService.update(id, {end_time: events[events.length - 1].timestamp});
          res = await this.sessionService.create({
            ...others, 
            start_time: events[0].timestamp, 
            end_time: events[events.length - 1].timestamp,
            user_id: userId 
          });
        } else {
          const newSession = {
            start_time,
            end_time: events[events.length - 1].timestamp, 
            ...defaultValues
          }
          res = await this.sessionService.update(id, {...newSession});
        }
      } else {
        res = { id }
      }
    } else {
      res = await this.sessionService.create({
        ...others, 
        start_time: events && events.length > 0 && events[0].timestamp, 
        end_time: events && events.length > 0 && events[events.length - 1].timestamp, 
        user_id: userId
      });
    }

    // 存储事件
    events.map(item => {
      item.data = JSON.stringify(item.data);
      item['session_id'] = res.id
    })
    events && events.length > 0 && await this.eventService.create(events);

    return {
      id: res.id
    }
  }


  @Get('/get_user_sessions') 
  async getUserSessions(@Query() query): Promise<any> {
    const { username } = query;
    return this.sessionService.getSessionsByUser({user_id: username});
  }

  // @Get('/get_session') 
  // async getSession(@Body() body): Promise<any> {
  //   const { username } = body;
  //   return this.sessionService.getSession({user_id: username})
  // }

  @Get('/get_session') 
  async getSession(@Query() query): Promise<any> {
    const { id } = query;
    const events = await this.eventService.getEventBySession({session_id: id});
    const session = events && await this.sessionService.getSession({id});
    return { events, ...session }
  }

  @Get('/get_sessions') 
  async getAllSession(): Promise<any> {
    return this.sessionService.findAll();
  }

}