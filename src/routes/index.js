import express from 'express'

import orders from './orders'
import products from './products'
import users from './users'

const router = express.Router()

router.use('/orders', orders)
router.use('/products', products)
router.use('/users', users)

// Handling not found requests
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

export default router
