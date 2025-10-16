import { IsDateString, IsOptional, IsString } from "class-validator";

export class patchListToDoDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsDateString()
    @IsOptional()
    deadlineAt?: string;
}