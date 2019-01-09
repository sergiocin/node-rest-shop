import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json({
    route: 'GET - /products'
  })
})

router.post('/', (req, res) => {
  res.status(200).json({
    route: 'POST - /products'
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  res.status(200).json({
    route: `GET - /products/${id}`
  })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  res.status(200).json({
    route: `PATCH - /products/${id}`
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  res.status(200).json({
    route: `DELETE - /products/${id}`
  })
})

module.exports = router
