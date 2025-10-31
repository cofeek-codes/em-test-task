import { Router } from 'express'
import userController from './user.service'
import { authMiddleware } from '../middleware/auth.middleware'

export const userRouter = Router()

userRouter.use(authMiddleware)

userRouter.get('/self', userController.getSelf)
userRouter.get('/self/block', userController.blockSelf)
