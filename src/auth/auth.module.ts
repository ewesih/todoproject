import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseService } from '../database/database.service';
import { PasswordService } from '../hash/hashpassword';

@Module({
    imports: [UserModule, JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            global: true,
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: {expiresIn: '1d'},
        }),
        inject: [ConfigService],
    })],
    providers: [AuthService, DatabaseService, PasswordService, ConfigService],
    controllers: [AuthController],
    exports: [AuthService]
})

export class AuthModule {}
