import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [ListService],
    exports: [ListService],
})

export class ListModule {}
