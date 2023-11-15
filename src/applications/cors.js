const whitelist = [
  'http://localhost:3000',
  'http://localhost:5500',
  'http://localhost:3500'
]

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}

export default corsOptions
