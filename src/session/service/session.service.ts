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

  async create(session: SessionEntity): Promise<SessionEntity> {
    return await this.sessionRepository.save(session)
  }

  async update(id: number, session: any): Promise<any> {
    await this.sessionRepository.update(id, session)
    return { id }
  }

  async getSession(params): Promise<SessionEntity> {
    return await this.sessionRepository.findOne({...params})
  }


}