import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'

import routes from './routes/index'

dotenv.config()

const app = express()
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.use('/', routes)

// Handling errors
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({ error: { message: error.message }})
})

export default app
