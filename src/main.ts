import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import TwitchClient from './TwitchClient/TwitchClient';
const GreetingsHandler = require('./src/Handlers/Greetings');
const KekHandler = require('./src/Handlers/KekHandler');
const FeedHandler = require('./src/Handlers/Feed');
const IQHandler = require('./src/Handlers/IQ');

async function bootstrap() {
  // Current handlers chain: Greetings -> Kek

  const greetingsHandler = new GreetingsHandler();
  const kekHandler = new KekHandler();
  const feedHandler = new FeedHandler();
  const iqHandler = new IQHandler();
  greetingsHandler.successor = kekHandler;
  kekHandler.successor = feedHandler;
  feedHandler.successor = iqHandler;
  const handlers = [greetingsHandler, kekHandler, feedHandler];
  const bot = new TwitchClient(handlers);

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
