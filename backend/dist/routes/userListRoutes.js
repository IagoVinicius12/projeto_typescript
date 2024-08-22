"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authmiddleware_1 = __importDefault(require("../middlewares/authmiddleware"));
const userListRoutes = (0, express_1.Router)();
userListRoutes.get('/list', userController_1.userList);
userListRoutes.put('/update/:id', userController_1.userUpdate);
userListRoutes.get('/userdata/:id', userController_1.userData);
userListRoutes.put('/updateowndata', authmiddleware_1.default, userController_1.userUpdatingOwnData);
exports.default = userListRoutes;
