import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";

export const typeOrmTestConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
}

export const TypeOrmTestModule = TypeOrmModule.forRoot(typeOrmTestConfig);
export const sqliteDataSourceConfig = registerAs(
    'sqlite',
    ()=> typeOrmTestConfig,
);