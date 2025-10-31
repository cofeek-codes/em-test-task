import { PrismaClient } from '../generated/prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

const getSelf = async (req: Request, res: Response) => {
  const id = 1
  const user = await prisma.user.findFirst({
    where: { id },
    omit: { password: true },
  })

  if (!user) {
    return res.status(404).json({ message: `user with id ${id} not found` })
  }

  return res.json(user)
}

const userController = { getSelf }

export default userController
