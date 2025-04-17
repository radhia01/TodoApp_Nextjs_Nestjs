import { DatabaseService } from './../database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor( private readonly databaseService:DatabaseService){}
  async create(userId:number,createTaskDto: CreateTaskDto,) { 
   
     const task=await   this.databaseService.task.create({
      data:{
      userId,
      ...createTaskDto
     }})
     return  task;
  }

 async  findAll(userId: number) {
    return  this.databaseService.task.findMany({where:{userId}})
  }
  async findOne(id: number) {
    return this.databaseService.task.findUnique({where:{id}});
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return   this.databaseService.task.update({where:{id,},
    data:updateTaskDto})
  }

  async remove(id: number) {
    return  this.databaseService.task.delete({where:{id,}});
  }
}
