import { Request, Response } from 'express';
import { AppDataSource } from '../connection/database';
import { error } from 'console';
import { Professor } from '../entity/Professor';

export const cadastro_professor=async(req:Request, res:Response)=>{
    const { nome, email, cpf, endereco, numero, complemento, cidade, estado } = req.body;
    try{
        const professor=new Professor();

        professor.nome=nome;
        professor.email=email;
        professor.cpf = cpf;
        professor.endereco = endereco;
        professor.numero = numero;
        professor.complemento = complemento;
        professor.cidade = cidade;
        professor.estado = estado;

        await AppDataSource.getRepository(Professor).save(professor)
        res.status(201).json({message: "Professor cadastrado com sucesso",professor})
    }catch(error){
        res.status(500).json({message: "Não foi possivel cadastrar"})
    }
}
export const todos_professores=async(req:Request,res:Response)=>{
    try{
        const prof= await AppDataSource.manager.find(Professor)
        if(prof){
            res.status(200).json({message:"Aqui estão os alunos",prof})
        }
    }catch(error){
        res.status(500).json({message:"Ocorreu um erro"})
    }
}

export const update_prof=async(req:Request,res:Response)=>{
    const { nome, email, cpf, endereco, numero, complemento, cidade, estado } = req.body;
    const {id}=req.params;
    try{
        const prof=await AppDataSource.getRepository(Professor).findOne({where:{id:parseInt(id)}})
        if(prof){
            prof.nome=nome || prof.nome;
            prof.email=email || prof.email;
            prof.cpf = cpf || prof.cpf;
            prof.endereco = endereco || prof.endereco;
            prof.numero = numero || prof.numero;
            prof.complemento = complemento || prof.complemento;
            prof.cidade = cidade|| prof.cidade;
            prof.estado = estado || prof.estado;

            await AppDataSource.getRepository(Professor).save(prof)
            return res.status(201).json({message:"Professor alterado com sucesso!!",prof})
        }
        res.status(404).json({message:"Professor não encontrado"})
    }catch(error){
        res.status(500).json({message:"Ocorreu um erro"})
    }
}

export const delete_professor=async(req:Request,res:Response)=>{
    const {id}=req.params;
    try{
        const prof=await AppDataSource.getRepository(Professor).findOne({where:{id:parseInt(id)}})
        if(!prof){
            return res.status(404).json({message:"Professor não encontrado"})
        }

        await AppDataSource.getRepository(Professor).delete(prof)
        res.status(201).json({message:"Professor deletado com sucesso!!",prof})

    }catch(error){
        res.status(500).json({message:"Ocorreu um erro"})
    }
}