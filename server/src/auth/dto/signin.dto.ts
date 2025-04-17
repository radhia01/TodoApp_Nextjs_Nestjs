import {IsString,IsOptional, IsEmail} from "class-validator"
export class SignInDto {
       @IsEmail()
       email: string 
       @IsString()
       password:string
    
}