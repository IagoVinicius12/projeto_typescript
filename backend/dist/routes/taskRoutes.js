"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const authmiddleware_1 = __importDefault(require("../middlewares/authmiddleware"));
const taskRoutes = (0, express_1.Router)();
taskRoutes.post('/registration', taskController_1.taskRegistration);
taskRoutes.get('/tasklist', taskController_1.taskList);
taskRoutes.delete('/taskdelete/:id', taskController_1.taskDelete);
taskRoutes.put('/taskupdate/:id', taskController_1.taskUpdate);
taskRoutes.get('/tasklistchecked', taskController_1.taskListCheckeds);
taskRoutes.get('/tasklistnonchecked', taskController_1.taskListNONCheckeds);
taskRoutes.post('/usertask', authmiddleware_1.default, taskController_1.userCreatingTask);
exports.default = taskRoutes;
