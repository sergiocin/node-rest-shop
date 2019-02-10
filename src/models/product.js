import mongoose from 'mongoose'

const schema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  price: String
})
const Product = mongoose.model('Product', schema)

export default Product
