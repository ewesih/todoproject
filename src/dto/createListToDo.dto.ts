import { IsDateString, IsOptional, IsString } from "class-validator";

export class createListToDoDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsDateString()
    @IsOptional()
    deadlineAt?: string;
}