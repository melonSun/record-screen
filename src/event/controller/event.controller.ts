import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EventEntity } from '../../entity/event.entity';
import { EventService } from '../service/event.service'

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  findAll(): Promise<EventEntity[]> {
    return this.eventService.findAll()
  }

  @Post('/create')
  create(@Query() query, @Body() body): Promise<any> {
    const { events } = body;
    events.map(item => {
      item.data = JSON.stringify(item.data)
    })
    return events && events.length > 0 && this.eventService.create(events);
  }
}