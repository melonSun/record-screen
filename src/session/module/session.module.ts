import { Module } from '@nestjs/common';
import { SessionService } from '../service/session.service';
import { SessionController } from '../controller/session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from '../../entity/session.entity';
import { UserService } from './../../user/service/user.service';
import { UserModule } from './../../user/module/user.module';
import { EventService } from '../../event/service/event.service';
import { EventModule } from '../../event/module/event.module';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity]), EventModule],
  providers: [SessionService, EventService],
  controllers: [SessionController],
})
export class SessionModule {}