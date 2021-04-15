import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SessionEntity } from "src/entity/session.entity";
import { Repository, getConnection } from "typeorm";


@Injectable()
export class SessionService{
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
  ) {}

  async findAll(): Promise<SessionEntity[]> {
    return await this.sessionRepository.find()
  }

  async create(session: SessionEntity[]): Promise<any> {
    return await this.sessionRepository.save(session)
  }
}