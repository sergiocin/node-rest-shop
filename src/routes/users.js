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

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(404).json({
      message: 'user not found'
    })
  }

  const match = bcrypt.compareSync(req.body.password, user.password)
  if (match) {
    return res.status(404).json({
      message: 'logged'
    })
  }
  return res.status(401).json({
    error: 'password or email does not match'
  })
})

router.delete('/:id', async (req, res) => {
  const result = await User.deleteOne({ _id: req.params.id })
  if (result.n > 0) {
    return res.status(200).json({
      message: 'user deleted'
    })
  }
  return res.status(404).json({
    error: 'user not found'
  })
})

export default router
