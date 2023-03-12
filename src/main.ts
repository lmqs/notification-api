import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import RabbitmqServer from './rabbitmq-server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);

  await RabbitmqServer.getInstance().start();
  await RabbitmqServer.getInstance().consume('notification', (message) =>
    console.log(message.content.toString()),
  );
}

bootstrap();
