import { Body, Controller, Delete, Get, Patch, Post, Req, Request } from '@nestjs/common';
import { ListService } from './list.service';
import { createListToDoDto } from '../dto/createListToDo.dto';
import { DeleteListToDoDto } from '../dto/deleteListToDo.dto';
import { patchListToDoDto } from '../dto/patchListToDo.dto';

@Controller('list')
export class ListController {
    constructor(private readonly listService: ListService) {}

    @Get()
    async getToDo(@Request() req) {
        return this.listService.getListsByUser(req.user.id);
    }

    @Post('create')
    async createToDo(@Body() dto: createListToDoDto, @Request() req) {
        const body = dto;
        return this.listService.createList(body, req.user.id);
    }

    @Delete('delete')
    async deleteToDo(@Body() dto: DeleteListToDoDto, @Request() req) {
        return this.listService.deleteList(dto.id, req.user.id)
    }

    @Patch('patch')
    async patchToDo(@Body() dto: patchListToDoDto, @Request() req) {
        return this.listService.patchList(dto, req.user.id);
    }
}
