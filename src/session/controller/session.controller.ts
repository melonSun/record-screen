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
    

  @Get()
  findAll(): Promise<SessionEntity[]> {
    return this.sessionService.findAll()
  }

  @Post('/create')
  create(@Query() query, @Body() body): Promise<any> {
    const { events, id,  ...others } = body;
    const { userId, username, nickname } = query;
    events.map(item => {
      item.data = JSON.stringify(item.data)
    })
    events && events.length > 0 && this.eventService.create(events);
    return id && this.sessionService.create({...others});
    // return id? null: ((this.sessionService.create({...others}) ) && this.userService.create({username, nickname}));
  }
}