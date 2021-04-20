import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserEntity } from '../../entity/user.entity';
import { UserService } from '../service/user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return  this.userService.findAll();
  }
}