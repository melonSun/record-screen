import { Module } from '@nestjs/common';
import { CatService } from '../service/cat.service';
import { CatController } from '../controller/cat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from '../../entity/cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatEntity])],
  providers: [CatService],
  controllers: [CatController]
})
export class CatModule {}