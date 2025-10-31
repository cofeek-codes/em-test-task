import jwt, { JwtPayload } from 'jsonwebtoken'
import { PrismaClient } from '../generated/prisma/client'
import { NextFunction, Request, Response } from 'express'
import serverConfig from '../configs/server.config'

const prisma = new PrismaClient()

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: '401: Anauthorized' })
  }

  var decodedjwtPayload = jwt.verify(
    token,
    serverConfig.jwtSecret,
  ) as JwtPayload

  var authenticatedUser = await prisma.user.findUnique({
    where: { id: decodedjwtPayload.id },
    select: { id: true },
  })

  if (!authenticatedUser) {
    return res.status(401).json({ message: '401: Anauthorized' })
  }

  req.headers.currentUserId = authenticatedUser.id.toString()
  next()
}
