import { Module } from "@nestjs/common";

import databaseConfig from "@src/config/database.config";
import appConfig from "@src/config/app.config";
import authConfig from "@src/config/auth.config";

import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./database/typeorm-config.service";
import { DataSource } from "typeorm";

import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "@src/app/user/user.module";
import { AuthModule } from "@src/app/auth/auth.module";

@Module({
  imports    : [
    ConfigModule.forRoot({
      isGlobal   : true,
      load       : [
        databaseConfig,
        authConfig,
        appConfig
      ],
      envFilePath: [".env"]
    }),
    TypeOrmModule.forRootAsync({
      useClass         : TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      }
    }),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({}),
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers  : [
    JwtService
  ]
})
export class AppModule {
}
