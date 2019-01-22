import express from 'express'
import morgan from 'morgan'

import routes from './routes/index'

const app = express()

app.use(morgan('dev'))
app.use('/', routes)

// Handling errors
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({ error: { message: error.message }})
})

export default app
