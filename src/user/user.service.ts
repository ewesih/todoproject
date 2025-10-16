import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { createUserDto } from 'src/dto/createUser.dto';
import { patchUserDto} from 'src/dto/patchUser.dto';

@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService) {}

    async createUser(dto: createUserDto) {
        return await this.databaseService.user.create({
            data: {
                login: dto.login,
                email: dto.email,
                password: dto.password,
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

        if(user && user.password === password) {
            const {password, ...result} = user;
            return result;
        }

        return null;
    }

    async deleteUser(login: string) {
        try {
            return await this.databaseService.user.delete({
                where: {login}
            })
        } catch(error) {
            if(error.code === 'P2025') {
                throw new NotFoundException('Пользователь не найден!')
            }
            throw error;
        }
    }
}
