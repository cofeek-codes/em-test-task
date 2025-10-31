import express from 'express'
import serverConfig from './configs/server.config'
import { userRouter } from './user/user.router'
import { authRouter } from './auth/auth.router'

const app = express()

app.use(express.json())

app.use('/user', userRouter)
app.use('/auth', authRouter)

app.listen(serverConfig.port, () => {
  console.log(`server is running on port ${serverConfig.port}`)
})
