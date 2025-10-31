import { Router } from 'express'
import userController from './user.service'

export const userRouter = Router()

userRouter.get('/:id', userController.getById)
