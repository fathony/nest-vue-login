import { Global, Module } from "@nestjs/common";
import { UserModule } from "@src/app/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "@src/app/auth/strategy/jwt.strategy";
import { AuthService } from "@src/app/auth/services/auth.service";
import { AuthController } from "@src/app/auth/controllers/auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@src/database/entities/user.entity";

@Global()
@Module({
  imports    : [
    PassportModule,
    JwtModule.registerAsync({
      imports   : [ConfigModule],
      inject    : [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret     : configService.get("auth.secret"),
        signOptions: {
          expiresIn: configService.get("auth.expires")
        }
      })
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers  : [
    JwtService,
    JwtStrategy,
    AuthService
  ],
  exports    : [AuthService, JwtStrategy, JwtService]
})
export class AuthModule {

}