import jwt, { JwtPayload } from 'jsonwebtoken'
import { PrismaClient } from '../generated/prisma/client'
import { NextFunction, Request, Response } from 'express'
import serverConfig from '../configs/server.config'

const prisma = new PrismaClient()

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.headers.currentUserId)
  if (!id) {
    return res.status(401).json({ message: '401: Anauthorized' })
  }
  const user = await prisma.user.findUnique({ where: { id } })

  if (!user || user.role != 'ADMIN') {
    return res.status(401).json({ message: '401: Anauthorized (admins only)' })
  }
  next()
}
