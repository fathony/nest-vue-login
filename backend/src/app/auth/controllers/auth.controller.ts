import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors
} from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { ApiTags } from "@nestjs/swagger";
import { BaseResponse } from "@src/common/api/base-response";
import { User } from "@src/database/entities/user.entity";
import { LoginRequest } from "@src/app/auth/request/login.request";
import { RegisterRequest } from "@src/app/auth/request/register.request";

@ApiTags("Auth")
@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(public service: AuthService) {
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  public async login(@Body() payload: LoginRequest) {
    const result = await this.service.login(payload);

    return new BaseResponse({
      statusCode: HttpStatus.OK,
      name      : "Auth Login",
      message   : "Auth Login Success",
      data      : result
    });
  }

  @Post("register")
  @HttpCode(HttpStatus.OK)
  public async register(@Body() payload: RegisterRequest): Promise<BaseResponse<User>> {
    const result = await this.service.register(payload);

    return new BaseResponse<User>({
      statusCode: HttpStatus.OK,
      name      : "Register Account",
      message   : `Register Account Success`,
      data      : result
    });
  }
}
