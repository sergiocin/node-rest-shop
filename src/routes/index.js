import express from 'express'

import orders from './orders'
import products from './products'

const router = express.Router()

router.use('/orders', orders)
router.use('/products', products)

// Handling not found requests
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

export default router
