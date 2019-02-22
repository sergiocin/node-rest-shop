import mongoose from 'mongoose'

const schema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  email: { type: String, requeired: true },
  password: { type: String, requeired: true }
})

const User = mongoose.model('User', schema)
export default User
