import { PrismaClient } from '../generated/prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

const getSelf = async (req: Request, res: Response) => {
  const id = Number(req.headers.currentUserId)
  const user = await prisma.user.findFirst({
    where: { id },
    omit: { password: true },
  })

  if (!user) {
    return res.status(404).json({ message: `user with id ${id} not found` })
  }

  return res.json(user)
}

const blockSelf = async (req: Request, res: Response) => {
  const id = Number(req.headers.currentUserId)
  const user = await prisma.user.findFirst({
    where: { id },
    omit: { password: true },
  })

  if (!user) {
    return res.status(404).json({ message: `user with id ${id} not found` })
  }

  if (user.isBlocked) {
    return res
      .status(400)
      .json({ message: `User with id ${id} is aleardy blocked` })
  }

  await prisma.user.update({ data: { isBlocked: true }, where: { id } })

  return res.json({
    message: `User with id ${id} blocked himself successefully`,
  })
}

const userController = { getSelf, blockSelf }

export default userController
