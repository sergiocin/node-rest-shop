import { Router } from 'express'
import multer from 'multer'
import checkAuth from './../middleware/check-auth'
import validatorSchema from './../middleware/validator'
import productSchema from './../schemas/product'

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

router.get('/:id', async (req, res) => {
  try {
    const product = await ProductController.findById(req.params.id)
    if (product) {
      return res.status(200).json({ product })
    } else {
      return res.status(404).json({ message: 'I can not find your resource' })
    }
  } catch (error) {
    return res.status(error.code).json({ message: error.message })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const product = new ProductController(req.body)
    await product.update(req.params.id)
    return res.status(200).json({ message: 'Product Updated' })
  } catch (error) {
    return res.status(error.code).json({ message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const result = await ProductController.delete(req.params.id)
    if (result) return res.status(200).json({ message: 'Product Deleted' })
    return res.status(404).json({ message: 'Resource not found' })
  } catch (error) {
    return res.status(error.code).json({ message: error.message })
  }
})

export default router
