import { Router } from 'express'
import mongoose from 'mongoose'

import Product from './../models/product'

const router = Router()

router.get('/', (req, res) => {
  Product.find()
    .exec()
    .then(result => {
      if (result.length) {
  res.status(200).json({
          route: 'GET - /products',
          products: result
  })
      } else {
        res.status(404).json({
          route: 'GET - /products',
          message: 'I can not find your request'
})
      }
    })
    .catch(error => {
      res.status(500).json({
        route: 'GET - /products',
        error
      })
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
    .then(result => {
      res.status(201).json({
        route: 'POST - /products',
        productCreated: result
      })
    })
    .catch(error => {
      res.status(500).json({
        route: 'POST - /products',
        error
      })
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  Product.findById(id)
    .exec()
    .then(result => {
      if (result) {
      res.status(200).json({
        route: `GET - /products/${id}`,
        product: result
      })
      } else {
        res.status(404).json({
          route: `GET - /products/${id}`,
          message: 'I can not find your request'
    })
      }
    })
    .catch(error => {
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
