import { BadRequestException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { User } from "@src/database/entities/user.entity";
import { BaseResponse } from "@src/common/api/base-response";
import { LoginRequest } from "@src/app/auth/request/login.request";
import { RegisterRequest } from "@src/app/auth/request/register.request";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService
  ) {
  }

  async login(
    payload: LoginRequest
  ) {
    const user = await this.usersRepository.findOneBy({
      username: payload.username
    });

    if (!user) {
      throw new NotFoundException(
        new BaseResponse({
          statusCode: HttpStatus.NOT_FOUND,
          name      : "Auth Login",
          message   : "Auth Login Failed",
          data      : {
            username: "username not found"
          }
        })
      );
    }

    const isValidPassword = await bcrypt.compare(
      payload.password,
      user.password
    );

    if (isValidPassword) {
      const token = await this.jwtService.sign({
        id: user.id
      }, {
        secret   : this.configService.get("auth.secret"),
        expiresIn: this.configService.get("auth.expires")
      });

      delete user["password"];

      return {
        ...user,
        token: token
      };
    } else {
      throw new BadRequestException(
        new BaseResponse({
          statusCode: HttpStatus.BAD_REQUEST,
          name      : "Auth Login",
          message   : "Login Failed",
          data      : {
            password: "invalid password"
          }
        })
      );
    }
  }

  async register(payload: RegisterRequest): Promise<User> {
    const findUserByUsername = await this.usersRepository.findOneBy({
      username: payload.username
    });

    if (findUserByUsername) {
      throw new BadRequestException(
        new BaseResponse({
          statusCode: HttpStatus.BAD_REQUEST,
          name      : "Register",
          message   : "Registration Failed",
          data      : {
            username: "username already exist"
          }
        })
      );
    }

    const register = this.usersRepository.create(payload);

    return await this.usersRepository.save(register);
  }
}
