import { Request, Response } from 'express';
import { AppDataSource } from '../connection/database';
import { error } from 'console';
import { Aluno } from '../entity/Aluno';

export const alunoregister = async (req: Request, res: Response) => {
    const { nome, email, cpf, endereco, numero, complemento, cidade, estado } = req.body;
    try {
        const aluno = new Aluno()

        aluno.nome = nome;
        aluno.email = email;
        aluno.cpf = cpf;
        aluno.endereco = endereco;
        aluno.numero = numero;
        aluno.complemento = complemento;
        aluno.cidade = cidade;
        aluno.estado = estado;

        await AppDataSource.getRepository(Aluno).save(aluno)
        res.status(201).json({ message: 'Aluno registrado com sucesso ', aluno })
    } catch (error) {
        res.status(500).json({ message: 'Não foi possivel registrar o aluno' })
    }

}

export const alunolist = async (req: Request, res: Response) => {
    try {
        const alunos = await AppDataSource.manager.find(Aluno)
        res.status(200).json({ message: 'Aqui estão os alunos:', alunos })
    } catch (error) {
        res.status(500).json({ error: "Não foi possivel achar os alunos" })
    }
}

export const update_aluno = async (req: Request, res: Response) => {
    const { id } = req.params
    const { nome, email, cpf, endereco, numero, complemento, cidade, estado } = req.body;
    try {

        const aluno = await AppDataSource.getRepository(Aluno).findOne({ where: { id: parseInt(id) } })


        if (!aluno) {
            return res.status(404).json({ message: 'Aluno nao encontrado' })
        }
        aluno.nome = nome || aluno.nome;
        aluno.email = email || aluno.email;
        aluno.cpf = cpf || aluno.cpf;
        aluno.endereco = endereco || aluno.endereco;
        aluno.numero = numero || aluno.numero;
        aluno.complemento = complemento || aluno.complemento;
        aluno.cidade = cidade || aluno.cidade;
        aluno.estado = estado || aluno.estado;

        await AppDataSource.getRepository(Aluno).save(aluno)
        res.status(200).json({ message: 'Aqui está o aluno atualizado', aluno })
    } catch (error) {
        res.status(500).json({ message: "Não foi possivel atualizar o aluno" })
    }
}

export const aluno_id= async(req:Request,res:Response)=>{
    const {id}=req.params
    try{
        const aluno= await AppDataSource.getRepository(Aluno).findOne({where: {id:parseInt(id)}})
        if(aluno){
            res.status(200).json({message:'Aluno achado com sucesso',aluno})
        }
        else{
            res.status(404).json({message:'Aluno não encontrado'})
        }
    }catch(error){
        res.status(500).json({message:'Não foi possível achar o aluno'})
    }
}

export const aluno_delete=async(req:Request,res:Response)=>{
    const {id}=req.params;

    try{
        const aluno=await AppDataSource.getRepository(Aluno).findOne({where:{id:parseInt(id)}})
        if(aluno){
            await AppDataSource.getRepository(Aluno).delete(aluno)
            return res.status(200).json({message:'Aluno deletado com sucesso'})
        }
    }
    catch(error){

    }
}