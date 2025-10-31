import dotenv from 'dotenv'

type ServerConfig = {
  port: number
}

dotenv.config()

const serverConfig: ServerConfig = {
  port: Number(process.env.PORT) || 3000,
}

export default serverConfig
