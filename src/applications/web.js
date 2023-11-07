import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import errorMiddleware from '../middleware/error.middleware.js'
import notFoundMiddleware from '../middleware/not-found.middleware.js'
import categoryRouter from '../routes/category.js'
import authRouter from '../routes/auth.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

dotenv.config()

app.get('/', (req, res) => {
  res.send(`Hi, it's working`)
})
app.use('/api/categories', categoryRouter)
app.use('/api/auth', authRouter)

app.use(errorMiddleware)
app.use(notFoundMiddleware)

export default app
