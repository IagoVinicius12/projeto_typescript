import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import { Task } from '../entity/Task';
import dotenv from 'dotenv';
import { Aluno } from '../entity/Aluno';
import { Professor } from '../entity/Professor';

dotenv.config({ path: 'variaveis.env' });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Task,Aluno,Professor],
  synchronize: true,
  logging: false,
});