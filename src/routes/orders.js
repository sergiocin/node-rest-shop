import { Router } from 'express'
import mongoose from 'mongoose'
import validatorSchema from './../middleware/validator'
import orderSchema from './../schemas/order'

import ValidationError from './../errors/ValidationError'

import Product from './../models/product'
import Order from './../models/orders'

const NOT_FOUND_MESSAGE = 'Resource not found'

const router = Router()

router.get('/', async (req, res) => {
  const route = 'GET - /orders'

  const result = await Order.find().populate('product')
    .catch((error) => res.status(500).json({ route, error }))

  if (result.length) {
    return res.status(200).json({
      route,
      count: result.length,
      orders: result.map(Order.format)
    })
  }

  return res.status(404).json({
    route,
    message: NOT_FOUND_MESSAGE
  })
})

router.post('/', orderSchema, validatorSchema, async (req, res) => {
  const route = 'POST - /orders'

  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    product: req.body.product
  })

  try {
    const validationError = order.validateSync()
    if (validationError) throw new ValidationError(validationError.message)

    const product = await Product.findById(req.body.product)
    if (!product) throw new ValidationError('Invalid Product')

    const result = await order.save()
    if (result) {
      return res.status(201).json({
        route,
        createdOrder: Order.format(result)
      })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(error.code).json({ route, error: error.message })
    }
    return res.status(500).json({ route, error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  const route = `GET - /orders/${req.params.id}`

  const result = await Order.findById(req.params.id).populate('product')
    .catch((error) => res.status(500).json({ route, error }))

  if (result) {
    return res.status(200).json({
      route,
      order: Order.format(result)
    })
  }

  return res.status(404).json({
    route,
    message: NOT_FOUND_MESSAGE
  })
})

router.delete('/:id', async (req, res) => {
  const route = `DELETE - /orders/${req.params.id}`

  const result = await Order.deleteOne({ _id: req.params.id })
    .catch((error) => res.status(500).json({ route, error }))

  if (result.n > 0) {
    return res.status(200).json({
      route,
      message: 'Deleted with successfully'
    })
  }

  return res.status(404).json({
    route,
    message: NOT_FOUND_MESSAGE
  })
})

export default router
