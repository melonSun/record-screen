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
    return await getConnection()
    .createQueryBuilder()
    .insert()
    .into(EventEntity)
    .values(events)
    .execute();
  }
}