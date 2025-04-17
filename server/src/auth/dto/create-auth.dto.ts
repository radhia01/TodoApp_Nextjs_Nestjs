
import {IsString,IsOptional, IsEmail} from "class-validator"
export class CreateAuthDto {
       @IsString()
       @IsOptional()
       firstName: string 
       @IsString()
       @IsOptional()
       lastName: string 
       @IsEmail()
       email: string 
       @IsString()
       password:string
    
}
