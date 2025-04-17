
import {
    IsNotEmpty,
    IsString,
    IsEnum
  } from 'class-validator';
  
  export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsEnum([ "PENDING","COMPLTED","REJECTED"],{message:"Valid role required"})
     status : "PENDING"|"COMPLTED"|"REJECTED"
  }
  