import mongoose from 'mongoose'

import { REGEX } from './../utils/constants'

const schema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  email: {
    type: String,
    requeired: true,
    unique: true,
    match: REGEX.EMAIL
  },
  password: { type: String, requeired: true }
})

const User = mongoose.model('User', schema)
export default User
