"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_professor = exports.update_prof = exports.todos_professores = exports.cadastro_professor = void 0;
const database_1 = require("../connection/database");
const Professor_1 = require("../entity/Professor");
const cadastro_professor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, email, cpf, endereco, numero, complemento, cidade, estado } = req.body;
    try {
        const professor = new Professor_1.Professor();
        professor.nome = nome;
        professor.email = email;
        professor.cpf = cpf;
        professor.endereco = endereco;
        professor.numero = numero;
        professor.complemento = complemento;
        professor.cidade = cidade;
        professor.estado = estado;
        yield database_1.AppDataSource.getRepository(Professor_1.Professor).save(professor);
        res.status(201).json({ message: "Professor cadastrado com sucesso", professor });
    }
    catch (error) {
        res.status(500).json({ message: "Não foi possivel cadastrar" });
    }
});
exports.cadastro_professor = cadastro_professor;
const todos_professores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prof = yield database_1.AppDataSource.manager.find(Professor_1.Professor);
        if (prof) {
            res.status(200).json({ message: "Aqui estão os alunos", prof });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Ocorreu um erro" });
    }
});
exports.todos_professores = todos_professores;
const update_prof = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, email, cpf, endereco, numero, complemento, cidade, estado } = req.body;
    const { id } = req.params;
    try {
        const prof = yield database_1.AppDataSource.getRepository(Professor_1.Professor).findOne({ where: { id: parseInt(id) } });
        if (prof) {
            prof.nome = nome || prof.nome;
            prof.email = email || prof.email;
            prof.cpf = cpf || prof.cpf;
            prof.endereco = endereco || prof.endereco;
            prof.numero = numero || prof.numero;
            prof.complemento = complemento || prof.complemento;
            prof.cidade = cidade || prof.cidade;
            prof.estado = estado || prof.estado;
            yield database_1.AppDataSource.getRepository(Professor_1.Professor).save(prof);
            return res.status(201).json({ message: "Professor alterado com sucesso!!", prof });
        }
        res.status(404).json({ message: "Professor não encontrado" });
    }
    catch (error) {
        res.status(500).json({ message: "Ocorreu um erro" });
    }
});
exports.update_prof = update_prof;
const delete_professor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const prof = yield database_1.AppDataSource.getRepository(Professor_1.Professor).findOne({ where: { id: parseInt(id) } });
        if (!prof) {
            return res.status(404).json({ message: "Professor não encontrado" });
        }
        yield database_1.AppDataSource.getRepository(Professor_1.Professor).delete(prof);
        res.status(201).json({ message: "Professor deletado com sucesso!!", prof });
    }
    catch (error) {
        res.status(500).json({ message: "Ocorreu um erro" });
    }
});
exports.delete_professor = delete_professor;
