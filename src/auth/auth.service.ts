import { PrismaClient } from '../generated/prisma/client'
import { Request, Response } from 'express'
import { RegisterDTO } from './dto/register.dto'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import serverConfig from '../configs/server.config'
import { LoginDTO } from './dto/login.dto'
import { INSPECT_MAX_BYTES } from 'buffer'

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
      password: await bcrypt.hash(registerDTO.password, 10),
    },
  })
  const token = jwt.sign({ id: user.id }, serverConfig.jwtSecret)
  return res.json({ user, token })
}

const login = async (req: Request, res: Response) => {
  const loginDTO: LoginDTO = req.body

  const existingUser = await prisma.user.findUnique({
    where: { email: loginDTO.email },
  })

  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email doesn't exist" })
  }

  const isValidPassword = await bcrypt.compare(
    loginDTO.password,
    existingUser.password,
  )

  if (!isValidPassword) {
    return res.status(400).json({ message: 'Invalid password' })
  }

  const token = jwt.sign({ id: existingUser.id }, serverConfig.jwtSecret)
  return res.json({ user: existingUser, token })
}

const authService = { register, login }

export default authService
