import express from 'express'

import productsRoutes from './routes/products'

const app = express()

app.use('/products', productsRoutes)

module.exports = app
