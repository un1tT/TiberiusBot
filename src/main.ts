import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import TwitchClient from './TwitchClient/TwitchClient';
import KekHandler from './Handlers/KekHandler';
import FeedHandler from './Handlers/Feed';
import IQHandler from './Handlers/IQ';
import GreetingsHandler from './Handlers/Greetings';

async function bootstrap() {
  // Current config chain: Greetings -> Kek




  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
