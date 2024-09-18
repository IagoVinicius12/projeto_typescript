import { Router } from "express";
import { todos_professores,cadastro_professor, prof_id } from "../controllers/professorController";

const profRoutes=Router()

profRoutes.post("/cadastro",cadastro_professor)
profRoutes.get("/list",todos_professores)
profRoutes.get("/mostrar/:id",prof_id)

export default profRoutes