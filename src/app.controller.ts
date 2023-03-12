import { Controller, Get, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import RabbitmqService from './rabbitmq-server';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  async getHealth(): Promise<any> {
    return { ok: 'ok', date: new Date() };
  }

  @Get('add-queue')
  async setQueue(): Promise<any> {
    await RabbitmqService.getInstance().publishInExchange(
      'amq.direct',
      'email',
      JSON.stringify({
        ok: 'ok',
        date: new Date(),
      }),
    );
    return 'Message sent to the queue!';
  }
}
