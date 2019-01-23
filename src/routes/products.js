import { Router } from 'express'
import mongoose, { mongo } from 'mongoose'

import Product from './../models/product'

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json({
    route: 'GET - /products'
  })
})

router.post('/', (req, res) => {
  const { name, price } = req.body
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name,
    price
  })
  product.save()
    .then(result => console.log('result: ', result))
    .catch(error => console.log('error: ', error))
  res.status(201).json({
    route: 'POST - /products',
    productCreated: { name, price }
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  Product.findById(id)
    .exec()
    .then(result => {
      console.log('Result: ', result)
      res.status(200).json({
        route: `GET - /products/${id}`,
        product: result
      })
    })
    .catch(error => {
      console.log('Error: ', error)
      res.status(500).json({
        route: `GET - /products/${id}`,
        error
      })
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

export default router
