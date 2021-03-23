import { Module } from '@nestjs/common';
import { EventService } from '../service/event.service';
import { EventController } from '../controller/event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from '../../entity/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  providers: [EventService],
  controllers: [EventController]
})
export class EventModule {}