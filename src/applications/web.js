import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import corsOptions from '../applications/cors.js'
import errorMiddleware from '../middleware/error.middleware.js'
import notFoundMiddleware from '../middleware/not-found.middleware.js'
import categoryRouter from '../routes/category.js'
import authRouter from '../routes/auth.js'
import campaignRouter from '../routes/campaign.js'
import donorRouter from '../routes/donor.js'
import contactRouter from '../routes/contact.js'
import publicRouter from '../routes/public.js'
import subscriberRouter from '../routes/subscriber.js'
import donationRouter from '../routes/donation.js'
import paymentRouter from '../routes/payment.js'
import settingRouter from '../routes/setting.js'
import cashoutRouter from '../routes/cashout.js'
import reportRouter from '../routes/report.js'

const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/storage', express.static('storage'))
app.use('/uploads', express.static('storage/uploads'))

dotenv.config()

app.get('/', (req, res) => {
  res.send(`Hi, it's working`)
})
app.use('/api', publicRouter)
app.use('/api/auth', authRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/campaigns', campaignRouter)
app.use('/api/donors', donorRouter)
app.use('/api/contacts', contactRouter)
app.use('/api/subscribers', subscriberRouter)
app.use('/api/donations', donationRouter)
app.use('/api/donations', paymentRouter)
app.use('/api/settings', settingRouter)
app.use('/api/cashouts', cashoutRouter)
app.use('/api/reports', reportRouter)

app.use(errorMiddleware)
app.use(notFoundMiddleware)

export default app
