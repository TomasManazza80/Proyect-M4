
import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvConfig } from "dotenv";
import { registerAs } from "@nestjs/config";


dotenvConfig({ path: ".env.development" });

const config = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "postgres",
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
  entities:['dist/**/*.entity{.ts,.js}'],   //tanto las entidades como las migraciones, tiene que ser compiladas al momento de por ejemplo hacer 
  migrations: ['dist/migrations/*{.ts,.js}'] // hacer un npn run build. para poder compilar las migraciones ya que si realizamos cambios estos no se veran si no son compilados 

}
  export default registerAs('typeorm', () => config)

  export const conectionSourceOptions = new DataSource(config as DataSourceOptions);



