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
    const userId = user? user.username: await this.userService.create({username, nickname});

    // 获取事件id
    events.map(item => {
      item.data = JSON.stringify(item.data)
    })
    const eventRes = events && events.length > 0 && await this.eventService.create(events);
    const { identifiers } = eventRes;
    const eventIds = identifiers ? identifiers.map(item => item.id): [];

    let res:any = {};
    if (sessionId) {
      const session = await this.sessionService.getSession({id: sessionId});
      const { id, start_time, event_ids, ...defaultValues } = session;
      if (events && events.length > 0) {
        if (events[events.length - 1].timestamp - start_time > 1000 * 60 * 30) {
          session['end_time'] = events[events.length - 1].timestamp
          this.sessionService.update(id, {end_time: events[events.length - 1].timestamp});
          res = await this.sessionService.create({
            ...others, 
            start_time: events && events[0].timestamp, 
            end_time: '', 
            event_ids: eventIds.join(','), 
            user_id: userId 
          });
        } else {
          const newSession = {
            start_time,
            ...defaultValues,
            event_ids: event_ids + eventIds.join(',')
          }
          res = await this.sessionService.update(id, {...newSession});
        }
      } else {
        res = { id }
      }
    } else {
      res = await this.sessionService.create({
        ...others, 
        start_time: events && events[0].timestamp, 
        end_time: '', 
        event_ids: eventIds.join(','), 
        user_id: userId 
      });
    }
    return {
      id: res.id
    }
  }


  @Get('/get_user_session') 
  async getUserSessions(@Body() body): Promise<any> {
    const { username } = body;
    return this.sessionService.getSession({user_id: username});
  }
}