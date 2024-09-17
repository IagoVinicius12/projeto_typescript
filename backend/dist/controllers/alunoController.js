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
exports.aluno_delete = exports.aluno_id = exports.update_aluno = exports.alunolist = exports.alunoregister = void 0;
const database_1 = require("../connection/database");
const Aluno_1 = require("../entity/Aluno");
const alunoregister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, email, cpf, endereco, numero, complemento, cidade, estado } = req.body;
    try {
        const aluno = new Aluno_1.Aluno();
        aluno.nome = nome;
        aluno.email = email;
        aluno.cpf = cpf;
        aluno.endereco = endereco;
        aluno.numero = numero;
        aluno.complemento = complemento;
        aluno.cidade = cidade;
        aluno.estado = estado;
        yield database_1.AppDataSource.getRepository(Aluno_1.Aluno).save(aluno);
        res.status(201).json({ message: 'Aluno registrado com sucesso ', aluno });
    }
    catch (error) {
        res.status(500).json({ message: 'Não foi possivel registrar o aluno' });
    }
});
exports.alunoregister = alunoregister;
const alunolist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alunos = yield database_1.AppDataSource.manager.find(Aluno_1.Aluno);
        res.status(200).json({ message: 'Aqui estão os alunos:', alunos });
    }
    catch (error) {
        res.status(500).json({ error: "Não foi possivel achar os alunos" });
    }
});
exports.alunolist = alunolist;
const update_aluno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nome, email, cpf, endereco, numero, complemento, cidade, estado } = req.body;
    try {
        const aluno = yield database_1.AppDataSource.getRepository(Aluno_1.Aluno).findOne({ where: { id: parseInt(id) } });
        if (!aluno) {
            return res.status(404).json({ message: 'Aluno nao encontrado' });
        }
        aluno.nome = nome || aluno.nome;
        aluno.email = email || aluno.email;
        aluno.cpf = cpf || aluno.cpf;
        aluno.endereco = endereco || aluno.endereco;
        aluno.numero = numero || aluno.numero;
        aluno.complemento = complemento || aluno.complemento;
        aluno.cidade = cidade || aluno.cidade;
        aluno.estado = estado || aluno.estado;
        yield database_1.AppDataSource.getRepository(Aluno_1.Aluno).save(aluno);
        res.status(200).json({ message: 'Aqui está o aluno atualizado', aluno });
    }
    catch (error) {
        res.status(500).json({ message: "Não foi possivel atualizar o aluno" });
    }
});
exports.update_aluno = update_aluno;
const aluno_id = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const aluno = yield database_1.AppDataSource.getRepository(Aluno_1.Aluno).findOne({ where: { id: parseInt(id) } });
        if (aluno) {
            res.status(200).json({ message: 'Aluno achado com sucesso', aluno });
        }
        else {
            res.status(404).json({ message: 'Aluno não encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Não foi possível achar o aluno' });
    }
});
exports.aluno_id = aluno_id;
const aluno_delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const aluno = yield database_1.AppDataSource.getRepository(Aluno_1.Aluno).findOne({ where: { id: parseInt(id) } });
        if (aluno) {
            yield database_1.AppDataSource.getRepository(Aluno_1.Aluno).delete(aluno);
            return res.status(200).json({ message: 'Aluno deletado com sucesso' });
        }
    }
    catch (error) {
    }
});
exports.aluno_delete = aluno_delete;
