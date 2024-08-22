"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).send('Access Denied');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'your_secret_key');
        req.user = decoded; // Armazena os dados do usuário decodificado no req
        next(); // Passa o controle para a próxima função de middleware ou rota
    }
    catch (err) {
        res.status(400).send('Invalid Token');
    }
};
exports.default = authMiddleware;
