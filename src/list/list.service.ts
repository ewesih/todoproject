import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { createListToDoDto } from 'src/dto/createListToDo.dto';
import { patchListToDoDto } from 'src/dto/patchListToDo.dto';

@Injectable()
export class ListService {
    constructor(private readonly databaseService: DatabaseService) {}

    async createList(dto: createListToDoDto) {
        return await this.databaseService.list.create({
            data: {
                title: dto.title,
                content: dto.content,
                userId: dto.userId,
                deadlineAt: dto.deadlineAt,
                status: 'pending',
            }
        })
    }

    async patchList(dto: patchListToDoDto, id: string) {
        const existingList = await this.databaseService.list.findUnique({
            where: {id}
        })
        if(!existingList) {
            throw new NotFoundException('Список не найден')
        }
        const updateData = Object.fromEntries(
            Object.entries(dto).filter(([_, value]) => value !== undefined)
        )
        return await this.databaseService.list.update({
            where: {id},
            data: updateData,
        })
    }

    async deleteList(id: string) {
        const list = await this.databaseService.list.findUnique({
            where: {id}
        })

        if(!list) {
            throw new NotFoundError('Список не найден')
        }

        return await this.databaseService.list.delete({
            where: {id}
        })
    }

    async getListsByUser(userId: string) {
        try {
            return await this.databaseService.list.findMany({
                where: {userId},
                orderBy: {createdAt: 'desc'}
            })
        } catch(error) {
            if(error.code === 'P2025') {
                throw new NotFoundException('Списки не найдены');
            }
            throw error;
        }

    }
}
