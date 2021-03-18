import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CatEntity } from "src/entity/cat.entity";
import { Repository } from "typeorm";

@Injectable()
export class CatService{
  constructor(
    @InjectRepository(CatEntity)
    private readonly catRepository: Repository<CatEntity>,
  ) {}

  async findAll(): Promise<CatEntity[]> {
    return await this.catRepository.find()
  }

  async create(): Promise<CatEntity> {
    return await this.catRepository.save({content: '111'})
  }
}