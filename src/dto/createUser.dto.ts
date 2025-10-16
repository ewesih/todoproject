import { IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class createUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    login: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    password: string;
}