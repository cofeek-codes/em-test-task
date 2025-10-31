import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import adminService from './admin.service'
import { adminMiddleware } from '../middleware/admin.middleware'

export const adminRouter = Router()

adminRouter.use(authMiddleware)
adminRouter.use(adminMiddleware)

adminRouter.get('/users/all', adminService.getAllUsers)
adminRouter.get('/users/:id', adminService.getUserById)
adminRouter.get('/users/block/:id', adminService.blockUserById)
