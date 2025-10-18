import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PasswordService } from 'src/hash/hashpassword';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [DatabaseModule],
    providers: [UserService, PasswordService, JwtService, ConfigService],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {}
