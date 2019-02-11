import mongoose from 'mongoose'

const schema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  quantity: { type: Number, required: true },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product'
  }
})
const Order = mongoose.model('Order', schema)

export default Order
