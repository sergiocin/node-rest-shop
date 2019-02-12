import { Router } from 'express'
import mongoose from 'mongoose'

import Order from './../models/orders'

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
    .catch((error) => {
      return res.status(500).json({
        route,
        error
      })
    })

  if (result.length) {
    return res.status(200).json({
      route,
      count: result.length,
      orders: result.map(format)
    })
  }
  return res.status(404).json({
    route,
    message: 'I can not find your request'
  })
})

router.post('/', (req, res) => {
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    product: req.body.product
  })
  order.save()
    .then(result => {
      res.status(201).json({
        route: 'POST - /orders',
        createdOrder: {
          _id: result._id,
          quantity: result.quantity,
          product: result.product,
          request: {
            method: 'GET',
            url: `http://localhost:3000/orders/${result._id}`
          }
        }
      })
    })
    .catch(error => {
      res.status(500).json({
        route: 'POST - /orders',
        error
      })
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  res.status(200).json({
    route: `GET - /orders/${id}`
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  res.status(200).json({
    route: `DELETE - /orders/${id}`
  })
})

export default router
