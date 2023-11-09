import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import errorMiddleware from '../middleware/error.middleware.js'
import notFoundMiddleware from '../middleware/not-found.middleware.js'
import categoryRouter from '../routes/category.js'
import authRouter from '../routes/auth.js'
import campaignRouter from '../routes/campaign.js'
import donorRouter from '../routes/donor.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/storage', express.static('storage'))
app.use('/uploads', express.static('storage/uploads'))

dotenv.config()

app.get('/', (req, res) => {
  res.send(`Hi, it's working`)
})
app.use('/api/auth', authRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/campaigns', campaignRouter)
app.use('/api/donors', donorRouter)

app.use(errorMiddleware)
app.use(notFoundMiddleware)

export default app
