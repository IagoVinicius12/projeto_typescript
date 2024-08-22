import { Request, Response } from 'express';
import { AppDataSource } from '../connection/database';
import { User } from '../entity/User';
import { Connection } from 'pg';
import bcrypt from 'bcryptjs';
import authMiddleware from '../middlewares/authmiddleware';
import jwt from 'jsonwebtoken';
import { hash } from 'crypto';
import {AuthRequest} from '../middlewares/authmiddleware'

export const userList = async (req: Request, res: Response) => {
    try {
        const users = await AppDataSource.manager.find(User);
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
}
const saltRounds = 10;
export const userUpdate = async (req: Request, res: Response) => {
    const { id } = req.params;  // Obtém o id do usuário a partir dos parâmetros da rota
    const { nome, email, password } = req.body;

    try {
        // Buscar o usuário pelo ID
        const user = await AppDataSource.getRepository(User).findOne({
            where: { id: parseInt(id) }
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Atualizar os campos com os novos valores
        user.nome = nome || user.nome;
        user.email = email || user.email;

        if (password) {
            user.password = await bcrypt.hash(password, saltRounds); // Hasheia a nova senha
        }

        // Salvar as atualizações no banco de dados
        await AppDataSource.getRepository(User).save(user);

        res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

export const userData = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await AppDataSource.getRepository(User).findOne({
            where: { id: parseInt(id) }
        })
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
}

export const userUpdatingOwnData = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id

        const { nome, email } = req.body;
        if(userId){
        const userForUpdate = await AppDataSource.getRepository(User).findOne({
            where: { id: parseInt(userId) }
        })

        if (!userForUpdate) {
            res.status(404).json({ message: 'Usuario não encontrado' })
        }
        else {

            if (nome) {
                userForUpdate.nome = nome;
            }

            if (email) {
                userForUpdate.email = email;
            }
            
            await AppDataSource.getRepository(User).save(userForUpdate)

            res.status(200).json({message:'Você atualizou seu perfil com sucesso', userForUpdate})
        }
    }else{
        res.status(404).json({message:'Usuario não encontrado'})
    }
    }catch(error){
        res.status(500).json({error:'Não foi possivel atualizar o perfil'})
    }
}

