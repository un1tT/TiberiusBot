import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import TwitchClient from './TwitchClient/TwitchClient';
import KekHandler from './Handlers/KekHandler';
import FeedHandler from './Handlers/Feed';
import IQHandler from './Handlers/IQ';
import GreetingsHandler from './Handlers/Greetings';

async function bootstrap() {
  // Current handlers chain: Greetings -> Kek

  const iqHandler = new IQHandler();
  const feedHandler = new FeedHandler(iqHandler);
  const kekHandler = new KekHandler(feedHandler);
  const greetingsHandler = new GreetingsHandler(kekHandler);

  const handlers = [greetingsHandler, kekHandler, feedHandler];
  const bot = new TwitchClient(handlers);

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
