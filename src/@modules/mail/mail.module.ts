import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailController } from './controllers/mail.controller';

const SERVICES = [];

const SUBSCRIBERS = [];

const CONTROLLERS = [MailController];

const ENTITIES = [];

@Module({
  imports: [TypeOrmModule.forFeature(ENTITIES)],
  providers: [...SERVICES, ...SUBSCRIBERS],
  controllers: [...CONTROLLERS],
  exports: [...SERVICES],
})
export class MailModule {}
