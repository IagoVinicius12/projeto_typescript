import { Request,Response } from "express";
import { AppDataSource } from "../connection/database";
import { Curso } from "../entity/Curso";
import { appendFile } from "fs";

export const todos_cursos=async(req:Request,res:Response)=>{
    try{
        const cursos=await AppDataSource.manager.find(Curso)
        if(cursos){
            return res.status(201).json({message:"Aqui estão os cursos",cursos})
        }
        res.status(404).json({message:"Não há nenhum curso cadastrado"})
    }catch(error){
        res.status(500).json({message:"Ocorreu um erro"})
    }
}
export const cadastro_curso=async(req:Request,res:Response)=>{
    const {nome,id_professor}=req.body
    try{
        const novo_curso=new Curso()
        novo_curso.nome=nome;
        novo_curso.id_professor=parseInt(id_professor);
        await AppDataSource.getRepository(Curso).save(novo_curso)
    }catch(error){
        res.status(500).json({message:"Ocorreu um erro"})
    }
}
export const update_curso=async(req:Request,res:Response)=>{
    const {id}=req.params
    const {nome,id_professor}=req.body;
    try{
        const att_curso=await AppDataSource.getRepository(Curso).findOne({where:{id:parseInt(id)}})
        if(!att_curso){
            return res.status(404).json({message:"Não foi possível encontrar o professor de id:",id})
        }
        att_curso.nome= nome || att_curso.nome;
        att_curso.id_professor= id_professor|| att_curso.id_professor
        await AppDataSource.getRepository(Curso).save(att_curso)
        res.status(201).json({message:"Curso atualizado com sucesso",att_curso})
    }catch(error){
        res.status(500).json({message:"Não foi possivel atualizar o curso"})
    }
}
export const delete_curso=async(req:Request,res:Response)=>{
    const {id}=req.params;
    try{
        const del_curso=await AppDataSource.getRepository(Curso).findOne({where:{id:parseInt(id)}})
        if(!del_curso){
            return res.status(404).json({message:"Não foi possível encontrar o curso"});
        }
        await AppDataSource.getRepository(Curso).delete(del_curso)
        res.status(201).json({message:"Curso deletado com sucesso"})
    }catch(error){
        res.status(500).json({message:"Ocorreu um erro"})
    }
}
export const curso_id=async(req:Request,res:Response)=>{
    const {id}=req.params
    try{   
        const curso=await AppDataSource.getRepository(Curso).findOne({where:{id:parseInt(id)}})
        if(!curso){
            return res.status(404).json({message:"Não foi encontrado o curso"})
        }
        res.status(201).json({message:"Aqui está o curso",curso})
    }catch(error){
        res.status(500).json({message:"Ocorreu um erro"})
    }
}