import { Router } from 'express'
import mongoose from 'mongoose'

import Order from './../models/orders'

const NOT_FOUND_MESSAGE = 'Resource not found'

const router = Router()

function format (order) {
  return {
    _id: order._id,
    quantity: order.quantity,
    product: order.product
  }
}

router.get('/', async (req, res) => {
  const route = 'GET - /orders'

  const result = await Order.find()
    .catch((error) => res.status(500).json({ route, error }))

  if (result.length) {
    return res.status(200).json({
      route,
      count: result.length,
      orders: result.map(format)
    })
  }

  return res.status(404).json({
    route,
    message: NOT_FOUND_MESSAGE
  })
})

router.post('/', async (req, res) => {
  const route = 'POST - /orders'

  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    product: req.body.product
  })

  const result = await order.save()
    .catch((error) => res.status(500).json({ route, error }))

  if (result) {
    return res.status(201).json({
      route,
      createdOrder: format(result)
    })
  }
})

router.get('/:id', async (req, res) => {
  const route = `GET - /orders/${req.params.id}`

  const result = await Order.findById(req.params.id)
    .catch((error) => res.status(500).json({ route, error }))

  if (result) {
    return res.status(200).json({
      route,
      order: format(result)
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
