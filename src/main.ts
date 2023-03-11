import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

//PRODUTOR
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3002);
// }

//CONSUMIDOR
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:admin@172.20.0.3:5672'],
      queue: 'email-subscribe',
      // false = manual acknowledgement; true = automatic acknowledgment
      noAck: true,
      // Get one by one
      prefetchCount: 1,
    },
  });
  await app.listen();
}

bootstrap();
