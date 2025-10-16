import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { createListToDoDto } from './dto/createListToDo.dto';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test/:id')
  getHello(@Param('id', ParseIntPipe) id: number) {
    if(id < 1) {
      throw new BadRequestException('Id должен быть больше 1')
    }
    return id;
  }
  
  @UsePipes(new ValidationPipe())
  @Post('test')
  createToDo(@Body() dto: createListToDoDto) {
    try {
      console.log('Удачное создание');
      return dto;
    } catch(error) {
      console.log('Ошибка: ', error)
    }
  }

  
}
