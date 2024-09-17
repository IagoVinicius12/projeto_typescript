import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './connection/database';
import authRoutes from './routes/authRoutes'; // Rotas de autenticação
import userListRoutes from './routes/userListRoutes';
import taskRoutes from './routes/taskRoutes';
import cookieParser from 'cookie-parser';
import alunoRoutes from './routes/alunoRoutes';
import profRoutes from './routes/professorRoutes'

dotenv.config({ path: 'variaveis.env' });

const app = express();
const port = process.env.PORT || 3001;

// Configurar middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar ao banco de dados e iniciar o servidor
AppDataSource.initialize()
  .then(() => {
    console.log('Conectado ao banco de dados');

    // Configurar rotas
    app.use(cookieParser())
    app.use('/auth', authRoutes);
    app.use('/user',userListRoutes);
    app.use('/task',taskRoutes);
    app.use('/aluno',alunoRoutes)
    app.use('/prof',profRoutes)

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch(error => console.log('Erro ao conectar com o banco de dados:', error));
