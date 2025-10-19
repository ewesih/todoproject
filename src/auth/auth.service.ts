import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';
import { SignInDto } from '../dto/signIn.dto';
import { PasswordService } from '../hash/hashpassword';

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService, private readonly passwordService: PasswordService, private readonly jwtService: JwtService) {}

    async validateUser(dto: SignInDto): Promise<{access_token: string}> {
        const user = await this.databaseService.user.findUnique({
            where: {login: dto.login}
        })
        const passwordIsMatch = await this.passwordService.comparePassword(dto.password,  user.password);

        if(!passwordIsMatch) {
            throw new UnauthorizedException('Пользователь не найден')
        }

        const payload = {sub: user.id, username: user.login};

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

}
