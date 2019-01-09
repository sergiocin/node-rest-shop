import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json({
    route: 'GET - /orders'
  })
})

router.post('/', (req, res) => {
  res.status(201).json({
    route: 'POST - /orders'
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

module.exports = router
