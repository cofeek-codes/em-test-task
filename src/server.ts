import express from 'express'
import serverConfig from './configs/server.config'
import { userRouter } from './user/user.controller'

const app = express()

app.use(express.json())

app.use('/user', userRouter)

app.listen(serverConfig.port, () => {
  console.log(`server is running on port ${serverConfig.port}`)
})
