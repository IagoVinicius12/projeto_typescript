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
exports.userList = void 0;
const database_1 = require("../connection/database");
const User_1 = require("../entity/User");
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
