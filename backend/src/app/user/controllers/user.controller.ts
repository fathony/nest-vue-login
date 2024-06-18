import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { UserService } from "@src/app/user/services/user.service";
import { BaseResponse } from "@src/common/api/base-response";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

const moduleName = "User";

@Controller("user")
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags("User")
@ApiBearerAuth("access-token")
@UseGuards(AuthGuard("jwt"))
export class UserController {
  constructor(
    public service: UserService
  ) {
  }

  @Get("profile")
  @HttpCode(HttpStatus.OK)
  public async profile() {
    const result = await this.service.getProfile();

    return new BaseResponse<any>({
      statusCode: HttpStatus.OK,
      name      : "Profile",
      message   : `Get ${moduleName} Profile Success`,
      data      : result
    });
  }

}
