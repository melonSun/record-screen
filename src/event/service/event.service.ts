import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventEntity } from "src/entity/event.entity";
import { Repository, getConnection } from "typeorm";


@Injectable()
export class EventService{
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async findAll(): Promise<EventEntity[]> {
    return await this.eventRepository.find()
  }

  async create(events: EventEntity[]): Promise<any> {
    // return await this.eventRepository.save(events)
    return await getConnection()
    .createQueryBuilder()
    .insert()
    .into(EventEntity)
    .values(events)
    .execute();
    // return this.eventRepository.query(
    //   `INSERT INTO syndatabase ( type, data, timestamp ) VALUES(${events.type}, ${events.data}, ${events.timestamp})`);
  }
}