import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

export const AppDataSource = new DataSource({
  type               : process.env.DATABASE_TYPE,
  host               : process.env.DATABASE_HOST,
  port               : parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username           : process.env.DATABASE_USERNAME,
  password           : process.env.DATABASE_PASSWORD,
  database           : process.env.DATABASE_NAME,
  synchronize        : process.env.DATABASE_SYNCHRONIZE === "true",
  dropSchema         : false,
  keepConnectionAlive: true,
  logging            : true,
  entities           : [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations         : [__dirname + "/migrations/**/*{.ts,.js}"],
  cli                : {
    entitiesDir   : "src/database/entities",
    migrationsDir : "src/database/migrations",
    subscribersDir: "subscriber"
  },
  extra              : {
    trustServerCertificate: true
  },
  options            : {
    cryptoCredentialsDetails: {
      minVersion: "TLSv1"
    }
  }
} as DataSourceOptions);

console.log(__dirname + "/../**/*.entity{.ts,.js}");
