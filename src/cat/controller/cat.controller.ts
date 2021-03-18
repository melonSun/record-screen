import { Controller, Get, Post } from '@nestjs/common';
import { CatEntity } from '../../entity/cat.entity';
import { CatService } from '../service/cat.service'

@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  findAll(): Promise<CatEntity[]> {
    return this.catService.findAll()
  }

  @Post('/create')
  create(): Promise<any> {
    return this.catService.create();
  }
}