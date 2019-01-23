import mongoose from 'mongoose'

const schema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  price: Number
})
const Product = mongoose.model('Product', schema)

export default Product