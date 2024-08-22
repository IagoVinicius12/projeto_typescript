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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdatingOwnData = exports.userData = exports.userUpdate = exports.userList = void 0;
const database_1 = require("../connection/database");
const User_1 = require("../entity/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield database_1.AppDataSource.manager.find(User_1.User);
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
});
exports.userList = userList;
const saltRounds = 10;
const userUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Obtém o id do usuário a partir dos parâmetros da rota
    const { nome, email, password } = req.body;
    try {
        // Buscar o usuário pelo ID
        const user = yield database_1.AppDataSource.getRepository(User_1.User).findOne({
            where: { id: parseInt(id) }
        });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        // Atualizar os campos com os novos valores
        user.nome = nome || user.nome;
        user.email = email || user.email;
        if (password) {
            user.password = yield bcryptjs_1.default.hash(password, saltRounds); // Hasheia a nova senha
        }
        // Salvar as atualizações no banco de dados
        yield database_1.AppDataSource.getRepository(User_1.User).save(user);
        res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});
exports.userUpdate = userUpdate;
const userData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield database_1.AppDataSource.getRepository(User_1.User).findOne({
            where: { id: parseInt(id) }
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
});
exports.userData = userData;
const userUpdatingOwnData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { nome, email } = req.body;
        if (userId) {
            const userForUpdate = yield database_1.AppDataSource.getRepository(User_1.User).findOne({
                where: { id: parseInt(userId) }
            });
            if (!userForUpdate) {
                res.status(404).json({ message: 'Usuario não encontrado' });
            }
            else {
                if (nome) {
                    userForUpdate.nome = nome;
                }
                if (email) {
                    userForUpdate.email = email;
                }
                yield database_1.AppDataSource.getRepository(User_1.User).save(userForUpdate);
                res.status(200).json({ message: 'Você atualizou seu perfil com sucesso', userForUpdate });
            }
        }
        else {
            res.status(404).json({ message: 'Usuario não encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Não foi possivel atualizar o perfil' });
    }
});
exports.userUpdatingOwnData = userUpdatingOwnData;
