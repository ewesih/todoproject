import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { createUserDto } from 'src/dto/createUser.dto';
import { patchUserDto} from 'src/dto/patchUser.dto';
import { PasswordService } from 'src/hash/hashpassword';

@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService, private readonly passwordService: PasswordService) {}

    async createUser(dto: createUserDto) {
            const hashedPassword = await this.passwordService.hashpassword(dto.password)
            return await this.databaseService.user.create({
                data: {
                    login: dto.login,
                    email: dto.email,
                    password: hashedPassword,
                }
            })
    }

    async patchUser(dto: patchUserDto, id: string) {
        const existingUser = await this.databaseService.user.findUnique({
            where: {id}
        })
        
        if(!existingUser) {
            throw new NotFoundException('Пользователь не найден')
        }
        
        return await this.databaseService.user.update({
            where: {id},
            data: {
                login: dto.login,
                password: dto.password,
            }
        })
    }

    async validateUser(login: string, password: string) {
        const user = await this.databaseService.user.findUnique({
            where: {login}
        })

        if(!user) {
            throw new UnauthorizedException('Неверные данные')
        }

        const passwordIsMatch = await this.passwordService.comparePassword(password, user.password);
        
        if(!passwordIsMatch) {
            throw new UnauthorizedException('Неверный пароль')
        }

        if(user && passwordIsMatch) {
            const {password, ...result} = user;
            return result;
        }

        return null;
    }

    async deleteUser(login: string) {
        const user = await this.databaseService.user.findUnique({
            where: {login}
        })

        if(!user) {
            throw new NotFoundException('Пользователь не найден!')
        }
        return await this.databaseService.user.delete({
            where: {login},
        })
    }
}
