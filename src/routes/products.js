import { Router } from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import checkAuth from './../middleware/check-auth'

import Product from './../models/product'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})
const upload = multer({ storage })
const router = Router()

function format (product) {
  return {
    _id: product._id,
    name: product.name,
    price: product.price,
    picture: product.picture,
    request: {
      method: 'GET',
      url: `http://localhost:3000/products/${product._id}`
    }
  }
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
          products: result.map(format)
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

router.post('/', checkAuth, upload.single('picture'), (req, res) => {
  const { name, price } = req.body
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name,
    price,
    picture: req.file.path
  })
  product.save()
    .then(result => {
      res.status(201).json({
        route: 'POST - /products',
        productCreated: format(result)
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
  Product.updateOne({ _id: id }, { $set: body })
    .exec()
    .then(() => {
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
  Product.deleteOne({ _id: id })
    .exec()
    .then(() => {
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
