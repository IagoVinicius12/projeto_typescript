import { Router } from "express";
import { todos_professores,cadastro_professor } from "../controllers/professorController";

const profRoutes=Router()

profRoutes.post("/cadastro",cadastro_professor)
profRoutes.get("/list",todos_professores)

export default profRoutes