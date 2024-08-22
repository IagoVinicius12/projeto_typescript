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
exports.loginUser = exports.registerUser = void 0;
const database_1 = require("../connection/database");
const User_1 = require("../entity/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const saltRounds = 10;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, email, password } = req.body;
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
        const user = new User_1.User();
        user.nome = nome;
        user.email = email;
        user.password = hashedPassword;
        yield database_1.AppDataSource.getRepository(User_1.User).save(user);
        res.status(201).json({ message: 'Usuário registrado com sucesso', user });
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield database_1.AppDataSource.getRepository(User_1.User).findOneBy({ email });
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600000,
            });
            res.status(200).json({ message: 'Login bem-sucedido', token });
        }
        else {
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});
exports.loginUser = loginUser;
