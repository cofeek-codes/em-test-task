import dotenv from 'dotenv'

type ServerConfig = {
  port: number
  jwtSecret: string
}

dotenv.config()

const serverConfig: ServerConfig = {
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET || '',
}

export default serverConfig
