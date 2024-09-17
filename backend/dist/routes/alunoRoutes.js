"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alunoController_1 = require("../controllers/alunoController");
const alunoRoutes = (0, express_1.Router)();
alunoRoutes.post('/registration', alunoController_1.alunoregister);
alunoRoutes.get('/alunoslist', alunoController_1.alunolist);
alunoRoutes.put('/update/:id', alunoController_1.update_aluno);
exports.default = alunoRoutes;
