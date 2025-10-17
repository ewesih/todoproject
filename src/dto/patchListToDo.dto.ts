import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class patchListToDoDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsString()
    @IsNotEmpty()
    id: string;

    @IsDateString()
    @IsOptional()
    deadlineAt?: string;
}