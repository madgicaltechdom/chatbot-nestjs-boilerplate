import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/model/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATA_BASE,
  entities: [User],
  synchronize: true,
};
