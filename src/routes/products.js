import { Router } from 'express'
import mongoose from 'mongoose'

import Product from './../models/product'

const router = Router()

function format (products) {
  return products.map(product => ({
    ...JSON.parse(JSON.stringify(product)),
    request: {
      method: 'GET',
      url: `http://localhost:3000/products/${product._id}`
    }
  }))
}

router.get('/', (req, res) => {
  Product.find()
    .select('_id name price')
    .exec()
    .then(result => {
      if (result.length) {
        res.status(200).json({
          route: 'GET - /products',
          count: result.length,
          products: format(result)
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
    .select('_id name price')
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
  const { body, params: { id } } = req
  Product.update({ _id: id }, { $set: body })
    .exec()
    .then(result => {
      console.log('Result: ', result)
      res.status(200).json({
        route: `PATCH - /products/${id}`,
        message: 'Updated with successfully'
      })
    })
    .catch(error => {
      res.status(200).json({
        route: `PATCH - /products/${id}`,
        error
      })
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      console.log('Result: ', result)
      res.status(200).json({
        route: `DELETE - /products/${id}`,
        message: 'Removed with successfully'
      })
    })
    .catch(error => {
      res.status(500).json({
        route: `DELETE - /products/${id}`,
        error
      })
    })
})

export default router
