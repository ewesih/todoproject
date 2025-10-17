import { IsString } from "class-validator";

export class DeleteListToDoDto {
    @IsString()
    id: string;
}