import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { DatabaseService } from 'src/database/database.service';
import { ConfigService } from '@nestjs/config';

const argon2 = require('argon2');
@Injectable()
export class AuthService {
  constructor( private  databaseService:DatabaseService, private jwtService: JwtService,
    private config: ConfigService,
  ){}
  async signup(createAuthDto: CreateAuthDto) {
    //  check if user already exist 
    const existingUser=await this.databaseService.user.findFirst({where:{email:createAuthDto.email}})
    if(existingUser){
     throw new ForbiddenException("user already exist ")
    }
    //  hash password 
    const hash=await argon2.hash(createAuthDto.password)
    createAuthDto.password=hash
     const user=await this.databaseService.user.create({data:createAuthDto})
     return user;
  }
  async signIn(signinDto: SignInDto) {
    // check if user exist in the database 
    const user=await this.databaseService.user.findFirst({where:{email:signinDto.email},
    include:{tasks:true}})
  if(!user){
    throw new ForbiddenException("user not found")
  }
  const pwMatches=await argon2.verify(user.password,signinDto.password)
  if(!pwMatches){
     throw new ForbiddenException("password incorrect")
  }
  const payload = { sub: user.id, email: user.email };
  const secret = this.config.get('JWT_SECRET');

   const token = await this.jwtService.signAsync(
    payload,
    {
      expiresIn: '15m',
      secret: secret,
    },
  );
  return {token,user};
  }


}
