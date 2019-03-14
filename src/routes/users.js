import { Router } from 'express'
import validatorSchema from './../middleware/validator'
import userSchema from './../schemas/users'

import UserController from './../controllers/User'

const router = Router()

router.post('/signup', userSchema, validatorSchema, async (req, res) => {
  try {
    const user = new UserController({ email: req.body.email, password: req.body.password })
    await user.signup()
    return res.status(201).json({ message: 'User Registered' })
  } catch (error) {
    return res.status(error.code).json({ message: error.message })
  }
})

router.post('/login', userSchema, validatorSchema, async (req, res) => {
  try {
    const user = new UserController({ email: req.body.email, password: req.body.password })
    const token = await user.login()
    return res.status(200).json({ message: 'User Authenticated', token })
  } catch (error) {
    return res.status(error.code).json({ message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const user = new UserController({ _id: req.params.id })
    const result = await user.delete()
    if (result) return res.status(200).json({ message: 'User Deleted' })
  } catch (error) {
    return res.status(error.code).json({ message: error.message })
  }
})

export default router
