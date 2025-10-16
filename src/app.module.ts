import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ListService } from './list/list.service';
import { UserService } from './user/user.service';
import { ListModule } from './list/list.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, ListModule, UserModule],
  controllers: [AppController],
  providers: [AppService, ListService, UserService],
})
export class AppModule {}
