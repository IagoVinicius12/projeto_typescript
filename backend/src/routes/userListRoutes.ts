import { Router } from 'express';
import { userData, userList,userUpdate, userUpdatingOwnData } from '../controllers/userController';
import authMiddleware from '../middlewares/authmiddleware';

const userListRoutes=Router();

userListRoutes.get('/list',userList);
userListRoutes.put('/update/:id',userUpdate)
userListRoutes.get('/userdata/:id',userData)
userListRoutes.put('/updateowndata', authMiddleware, userUpdatingOwnData)

export default userListRoutes;