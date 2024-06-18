import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "@src/app/user/controllers/user.controller";
import { UserService } from "@src/app/user/services/user.service";
import { User } from "@src/database/entities/user.entity";


const SERVICES = [
  UserService
];

@Global()
@Module({
  imports    : [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [
    UserController
  ],
  providers  : [
    ...SERVICES
  ],
  exports    : [...SERVICES]
})
export class UserModule {

}