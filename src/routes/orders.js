import { Router } from 'express'
import validatorSchema from './../middleware/validator'
import orderSchema from './../schemas/order'

import OrderController from './../controllers/Order'

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
  try {
    const result = await OrderController.delete(req.params.id)
    if (result) return res.status(200).json({ message: 'Order Deleted' })
    return res.status(404).json({ message: 'Resource not found' })
  } catch (error) {
    return res.status(error.code).json({ message: error.message })
  }
})

export default router
