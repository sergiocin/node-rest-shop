import express from 'express'

import orders from './orders'
import products from './products'

const router = express.Router()

router.use('/orders', orders)
router.use('/products', products)

module.exports = router