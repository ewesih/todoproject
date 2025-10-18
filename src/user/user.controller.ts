import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from 'src/dto/createUser.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { patchUserDto } from 'src/dto/patchUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {} 

    @HttpCode(HttpStatus.OK)
    @Post('register')
    async createUser(@Body() dto: createUserDto) {
        return this.userService.createUser(dto);
    }

    @UseGuards(AuthGuard)
    @Get(':email')
    async getUserByEmail(@Param('email') email: string) {
        return this.userService.getUserByEmail(email)
    }

    @Delete('delete')
    async deleteUser(login: string) {
        return this.userService.deleteUser(login)
    }

    @UseGuards(AuthGuard)
    @Patch('profile')
    async patchUser(@Body() dto: patchUserDto, @Request() req) {
        return this.userService.patchUser(dto, req.user.id)
    }
}
