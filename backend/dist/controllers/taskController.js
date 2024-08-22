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
exports.userCreatingTask = exports.taskUpdate = exports.taskDelete = exports.taskListNONCheckeds = exports.taskListCheckeds = exports.taskList = exports.taskRegistration = void 0;
const database_1 = require("../connection/database");
const Task_1 = require("../entity/Task");
const taskRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, checked } = req.body;
    try {
        const task = new Task_1.Task();
        task.nome = nome;
        task.checked = checked;
        yield database_1.AppDataSource.getRepository(Task_1.Task).save(task);
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ error: "Error ao registrar tarefa" });
    }
});
exports.taskRegistration = taskRegistration;
const taskList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield database_1.AppDataSource.manager.find(Task_1.Task);
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ error: 'Falha ao buscar dados' });
    }
});
exports.taskList = taskList;
const taskListCheckeds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const completedtasks = yield database_1.AppDataSource.getRepository(Task_1.Task).findBy({
            checked: true
        });
        res.status(200).json(completedtasks);
    }
    catch (error) {
        res.status(500).json({ error: 'Falha ao buscar dados' });
    }
});
exports.taskListCheckeds = taskListCheckeds;
const taskListNONCheckeds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const completedtasks = yield database_1.AppDataSource.getRepository(Task_1.Task).findBy({
            checked: false
        });
        res.status(200).json(completedtasks);
    }
    catch (error) {
        res.status(500).json({ error: 'Falha ao buscar dados' });
    }
});
exports.taskListNONCheckeds = taskListNONCheckeds;
const taskDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {nome,checked}=req.body
    const { id } = req.params;
    try {
        const task = yield database_1.AppDataSource.getRepository(Task_1.Task).findOne({
            where: { id: parseInt(id) }
        });
        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        yield database_1.AppDataSource.getRepository(Task_1.Task).delete(task);
        res.status(200).json({ message: 'Tarefa excluida!!' });
    }
    catch (error) {
        res.status(500).json({ error: 'Falha ao buscar dados' });
    }
});
exports.taskDelete = taskDelete;
const taskUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, checked } = req.body;
    const { id } = req.params;
    try {
        const task = yield database_1.AppDataSource.getRepository(Task_1.Task).findOne({
            where: { id: parseInt(id) }
        });
        if (!task) {
            res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        else {
            task.nome = nome || task.nome;
            task.checked = checked || task.checked;
            yield database_1.AppDataSource.getRepository(Task_1.Task).save(task);
            res.status(200).json(task);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
});
exports.taskUpdate = taskUpdate;
const userCreatingTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { nome, checked } = req.body;
        if (!userId) {
            return res.status(400).json({ error: 'Usuário não autenticado' });
        }
        const newTask = new Task_1.Task();
        newTask.userid = userId;
        newTask.nome = nome;
        newTask.checked = checked;
        yield database_1.AppDataSource.getRepository(Task_1.Task).save(newTask);
        res.status(201).json({ message: 'Tarefa registrada com sucesso', newTask });
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao registrar tarefa' });
    }
});
exports.userCreatingTask = userCreatingTask;
