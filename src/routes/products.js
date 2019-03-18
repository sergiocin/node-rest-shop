import { Router } from 'express'
import multer from 'multer'
import checkAuth from './../middleware/check-auth'
import validatorSchema from './../middleware/validator'
import productSchema from './../schemas/product'

import Product from './../models/product'
import ProductController from './../controllers/Product'

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

router.get('/', async (req, res) => {
  try {
    const products = await ProductController.getAll()
    if (products.length) {
      return res.status(200).json({
        count: products.length,
        data: products.map(format)
      })
    } else {
      return res.status(404).json({
        message: 'I can not find your resource'
      })
    }
  } catch (error) {
    return res.status(error.code).json({ message: error.message })
  }
})

router.post('/', upload.single('picture'), productSchema, validatorSchema, checkAuth, async (req, res) => {
  const { body: { name, price }, file: { path } } = req
  const product = new ProductController({ name, picture: path, price })

  try {
    await product.create()
    return res.status(201).json({ message: 'Product Created' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
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
