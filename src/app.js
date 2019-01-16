import express from 'express'

import routes from './routes/index'

const app = express()

app.use('/', routes)

module.exports = app
