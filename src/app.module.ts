import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ListService } from './list/list.service';
import { UserService } from './user/user.service';
import { ListModule } from './list/list.module';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PasswordService } from './hash/hashpassword';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, ListModule, UserModule, AuthModule],
  providers: [AppService, ListService, UserService, AuthService, PasswordService, JwtService],
})
export class AppModule {}
