import { Module } from '@nestjs/common';
import { SessionService } from '../service/session.service';
import { SessionController } from '../controller/session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from '../../entity/session.entity';
import { UserModule } from './../../user/module/user.module';
import { EventModule } from '../../event/module/event.module';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity]), EventModule, UserModule],
  providers: [SessionService],
  controllers: [SessionController],
})
export class SessionModule {}