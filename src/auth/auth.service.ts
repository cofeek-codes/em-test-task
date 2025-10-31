import { PrismaClient } from '../generated/prisma/client'
import { Request, Response } from 'express'
import { RegisterDTO } from './dto/register.dto'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import serverConfig from '../configs/server.config'

const prisma = new PrismaClient()

const register = async (req: Request, res: Response) => {
  const registerDTO: RegisterDTO = req.body

  const userExists = await prisma.user.findUnique({
    where: { email: registerDTO.email },
  })

  if (userExists) {
    return res
      .status(400)
      .json({ message: 'user with this email already exists' })
  }

  const user = await prisma.user.create({
    data: {
      fullName: registerDTO.fullName,
      email: registerDTO.email,
      password: bcrypt.hashSync(registerDTO.password, 10),
    },
  })
  const token = jwt.sign({ id: user.id }, serverConfig.jwtSecret)
  return res.json({ user, token })
}

const authService = { register }

export default authService
