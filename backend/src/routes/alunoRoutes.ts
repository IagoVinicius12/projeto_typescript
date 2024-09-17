import { Router } from 'express';
import { alunolist, alunoregister, update_aluno } from '../controllers/alunoController';

const alunoRoutes = Router();

alunoRoutes.post('/registration',alunoregister)
alunoRoutes.get('/alunoslist',alunolist)
alunoRoutes.put('/update/:id',update_aluno)

export default alunoRoutes;