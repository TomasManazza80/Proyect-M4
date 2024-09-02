import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";

// typeorm-config.ts
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  }

export const TypeOrmTestModule = TypeOrmModule.forRoot(typeOrmConfig);
export const sqliteDataSourceConfig = registerAs(
    'sqlite',
    ()=> typeOrmConfig,
);