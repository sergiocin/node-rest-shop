import express from 'express'

import productsRoutes from './routes/products'
import ordersRoutes from './routes/orders'

const app = express()

app.use('/products', productsRoutes)
app.use('/orders', ordersRoutes)

module.exports = app
