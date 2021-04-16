import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entity/user.entity";
import { Repository, getConnection } from "typeorm";


@Injectable()
export class UserService{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find()
  }

  async create(user: any): Promise<any> {
    return await this.userRepository.save(user)
  }

  async getUser(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({username})
  }

}