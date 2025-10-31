import express from 'express'
import serverConfig from './configs/server.config'

const app = express()

app.use(express.json())

app.listen(serverConfig.port, () => {
  console.log(`server is running on port ${serverConfig.port}`)
})
