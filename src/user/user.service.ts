import { PrismaClient } from '../generated/prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

const getById = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const user = await prisma.user.findFirst({
    where: { id },
    omit: { password: true },
  })

  if (!user) {
    return res.status(404).json({ message: `user with id ${id} not found` })
  }

  return res.json(user)
}

const userController = { getById }

export default userController
