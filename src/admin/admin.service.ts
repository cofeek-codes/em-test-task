import { PrismaClient } from '../generated/prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany()

  return res.json(users)
}

const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const user = await prisma.user.findUnique({ where: { id } })

  if (!user) {
    return res.status(404).json({ message: `User with id ${id} not found` })
  }

  return res.json(user)
}

const blockUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const user = await prisma.user.findUnique({ where: { id } })

  if (!user) {
    return res.status(404).json({ message: `User with id ${id} not found` })
  }
  if (user.isBlocked) {
    return res
      .status(400)
      .json({ message: `User with id ${id} is aleardy blocked` })
  }

  await prisma.user.update({ data: { isBlocked: true }, where: { id } })

  return res.json({ message: `User with id ${id} blocked successefully` })
}

const adminService = { getAllUsers, getUserById, blockUserById }

export default adminService
