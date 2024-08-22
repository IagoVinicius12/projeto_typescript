import { Router } from 'express';
import { taskDelete, taskList, taskListCheckeds, taskRegistration, taskUpdate,taskListNONCheckeds,userCreatingTask} from '../controllers/taskController';
import authMiddleware from '../middlewares/authmiddleware';

const taskRoutes=Router();

taskRoutes.post('/registration', taskRegistration)
taskRoutes.get('/tasklist',taskList)
taskRoutes.delete('/taskdelete/:id',taskDelete)
taskRoutes.put('/taskupdate/:id',taskUpdate)
taskRoutes.get('/tasklistchecked',taskListCheckeds)
taskRoutes.get('/tasklistnonchecked',taskListNONCheckeds)
taskRoutes.post('/usertask',authMiddleware,userCreatingTask)

export default taskRoutes