import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { DatabaseModule } from '../database/database.module';
import { ListController } from './list.controller';

@Module({
    imports: [DatabaseModule],
    providers: [ListService],
    exports: [ListService],
    controllers: [ListController],
})

export class ListModule {}
