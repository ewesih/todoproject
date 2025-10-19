import {  Injectable,  NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { createUserDto } from '../dto/createUser.dto';
import { patchUserDto} from 'src/dto/patchUser.dto';
import { PasswordService } from '../hash/hashpassword';

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

    async getUserByEmail(email: string): Promise<Omit<User, 'password'>> {
        const user = await this.databaseService.user.findUnique({
            where: {email}
        })

        if(!user) {
            throw new NotFoundException('Пользователь не найден')
        }

        return user;
    }

    async patchUser(dto: patchUserDto, id: string){
        const existingUser = await this.databaseService.user.findUnique({
            where: {id}
        })
        
        if(!existingUser) {
            throw new NotFoundException('Пользователь не найден')
        }
        
        const hashpassword = await this.passwordService.hashpassword(dto.password)

        return await this.databaseService.user.update({
            where: {id},
            data: {
                password: hashpassword,
            }
        })
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
