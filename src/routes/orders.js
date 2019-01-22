import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json({
    route: 'GET - /orders'
  })
})

router.post('/', (req, res) => {
  const { productId, quantity } = req.body
  res.status(201).json({
    route: 'POST - /orders',
    order: { productId, quantity }
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
