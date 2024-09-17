"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./connection/database");
const authRoutes_1 = __importDefault(require("./routes/authRoutes")); // Rotas de autenticação
const userListRoutes_1 = __importDefault(require("./routes/userListRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const alunoRoutes_1 = __importDefault(require("./routes/alunoRoutes"));
const professorRoutes_1 = __importDefault(require("./routes/professorRoutes"));
dotenv_1.default.config({ path: 'variaveis.env' });
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// Configurar middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Conectar ao banco de dados e iniciar o servidor
database_1.AppDataSource.initialize()
    .then(() => {
    console.log('Conectado ao banco de dados');
    // Configurar rotas
    app.use((0, cookie_parser_1.default)());
    app.use('/auth', authRoutes_1.default);
    app.use('/user', userListRoutes_1.default);
    app.use('/task', taskRoutes_1.default);
    app.use('/aluno', alunoRoutes_1.default);
    app.use('/prof', professorRoutes_1.default);
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
})
    .catch(error => console.log('Erro ao conectar com o banco de dados:', error));
