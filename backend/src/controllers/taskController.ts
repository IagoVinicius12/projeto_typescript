import { Request, Response } from 'express';
import { AppDataSource } from '../connection/database';
import { Task } from '../entity/Task';
import { error } from 'console';
import { AuthRequest } from '../middlewares/authmiddleware';

export const taskRegistration = async (req: Request, res: Response) => {
    const { nome, checked } = req.body;
    try {
        const task = new Task();
        task.nome = nome;
        task.checked = checked;
        await AppDataSource.getRepository(Task).save(task);
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ error: "Error ao registrar tarefa" })
    }
}


export const taskList = async (req: Request, res: Response) => {
    try {
        const task = await AppDataSource.manager.find(Task)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar dados' })
    }
}

export const taskListCheckeds=async (req: Request, res: Response) => {
    try {
        const completedtasks = await AppDataSource.getRepository(Task).findBy({
            checked: true
        });
        res.status(200).json(completedtasks)
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar dados' })
    }
}

export const taskListNONCheckeds=async (req: Request, res: Response) => {
    try {
        const completedtasks = await AppDataSource.getRepository(Task).findBy({
            checked: false
        });
        res.status(200).json(completedtasks)
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar dados' })
    }
}

export const taskDelete = async (req: Request, res: Response) => {
    // const {nome,checked}=req.body
    const { id } = req.params

    try {
        const task = await AppDataSource.getRepository(Task).findOne({
            where: { id: parseInt(id) }
        })
        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }

        await AppDataSource.getRepository(Task).delete(task)
        res.status(200).json({ message: 'Tarefa excluida!!' })
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar dados' })
    }
}

export const taskUpdate = async (req: Request, res: Response) => {
    const { nome, checked } = req.body
    const { id } = req.params
    try {
        const task = await AppDataSource.getRepository(Task).findOne({
            where: { id: parseInt(id) }
        });

        if (!task) {
            res.status(404).json({ error: 'Tarefa não encontrada' })
        }
        else {
            task.nome = nome || task.nome;
            task.checked = checked || task.checked;

            await AppDataSource.getRepository(Task).save(task)
            res.status(200).json(task)
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar tarefa' })
    }
}

export const    userCreatingTask = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const { nome, checked } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'Usuário não autenticado' });
        }

        const newTask = new Task();
        newTask.userid = userId;
        newTask.nome = nome;
        newTask.checked = checked;

        await AppDataSource.getRepository(Task).save(newTask);

        res.status(201).json({ message: 'Tarefa registrada com sucesso', newTask });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar tarefa' });
    }
};
