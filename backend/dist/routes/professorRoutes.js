"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const professorController_1 = require("../controllers/professorController");
const profRoutes = (0, express_1.Router)();
profRoutes.post("/cadastro", professorController_1.cadastro_professor);
profRoutes.get("/list", professorController_1.todos_professores);
exports.default = profRoutes;
