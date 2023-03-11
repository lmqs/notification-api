import { Controller, Get, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitMQService } from './rabbit-mq.service';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload,
} from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @Get('health')
  getHealth(): any {
    this.rabbitMQService.send('rabbit-mq-producer', {
      message: { ok: 'ok', date: new Date() },
    });
    return 'Message sent to the queue!';
  }

  @MessagePattern('rabbit-mq-producer')
  public async execute(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
  }

  @MessagePattern('amq.direct')
  public async execute2(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    channel.ack(orginalMessage);
  }
}
