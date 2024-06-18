import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
  url                   : process.env.DATABASE_URL,
  type                  : process.env.DATABASE_TYPE,
  host                  : process.env.DATABASE_HOST,
  port                  : parseInt(process.env.DATABASE_PORT, 10) || 5432,
  password              : process.env.DATABASE_PASSWORD,
  name                  : process.env.DATABASE_NAME,
  username              : process.env.DATABASE_USERNAME,
  synchronize           : process.env.DATABASE_SYNCHRONIZE === "true",
  log                   : process.env.DATABASE_LOG === "true",
  maxConnections        : parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10) || 100,
  sslEnabled            : process.env.DATABASE_SSL_ENABLED === "true",
  rejectUnauthorized    : process.env.DATABASE_REJECT_UNAUTHORIZED === "true",
  trustServerCertificate: process.env.DATABASE_TRUSH_SERVER_CERTIFICATE === "true",
  ca                    : process.env.DATABASE_CA,
  key                   : process.env.DATABASE_KEY,
  cert                  : process.env.DATABASE_CERT
}));
