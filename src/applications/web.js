import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import errorMiddleware from '../middleware/error.middleware.js'

const app = express()

app.use(cors())
app.use(express.json())

dotenv.config()

app.get('/', (req, res) => {
  res.send(`Hi, it's working`)
})

app.use(errorMiddleware)

export default app
