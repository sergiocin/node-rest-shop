import { Router } from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import User from './../models/user'

const router = Router()

router.post('/signup', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(409).json({
      error: 'email already used'
    })
  }
  try {
    const hash = bcrypt.hashSync(req.body.password, 10)

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hash
    })

    const result = await user.save()
    if (result) {
      res.status(201).json({
        message: 'Okay, we have created the user'
      })
    }
  } catch (error) {
    console.log('Hash Error: ', error)
    res.status(500).json({
      error
    })
  }
})

export default router
