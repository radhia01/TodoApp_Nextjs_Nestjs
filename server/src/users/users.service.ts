import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private databaseService:DatabaseService){}

  findAll() {
    return  this.databaseService.user.findMany()
  }
  

  

  
}
