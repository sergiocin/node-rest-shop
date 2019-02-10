import mongoose from 'mongoose'

const schema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true }
})
const Product = mongoose.model('Product', schema)

export default Product
