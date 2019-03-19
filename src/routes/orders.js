import { Router } from 'express'
import validatorSchema from './../middleware/validator'
import orderSchema from './../schemas/order'

import Order from './../models/orders'

import OrderController from './../controllers/Order'

const NOT_FOUND_MESSAGE = 'Resource not found'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const orders = await OrderController.getAll()
    if (orders) return res.status(200).json({ orders })
    return res.status(404).json({ message: 'Resource not found' })
  } catch (error) {
    return res.status(error.code).json({ message: error.message })
  }
})

router.post('/', orderSchema, validatorSchema, async (req, res) => {
  try {
    const order = new OrderController(req.body)
    await order.create()
    return res.status(201).json({ message: 'Order Created' })
  } catch (error) {
    return res.status(error.code).json({ message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const order = await OrderController.findById(req.params.id)
    if (order) return res.status(200).json({ order })
    return res.status(404).json({ message: 'Resource not found' })
  } catch (error) {
    return res.status(error.code).json({ message: error.message })
  }
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
