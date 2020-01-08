import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChannelsModule } from "./modules/channels/channels.module";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://tiberius:12vv12VV98aa98AA@ds062178.mlab.com:62178/tiberiusdb'),
    ChannelsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
