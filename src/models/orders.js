import mongoose from 'mongoose'

const schema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  quantity: { type: Number, required: true },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true
  }
})

schema.statics.format = function (model) {
  return {
    _id: model._id,
    quantity: model.quantity,
    product: {
      _id: model.product._id,
      name: model.product.name,
      price: model.product.price
    }
  }
}

const Order = mongoose.model('Order', schema)

export default Order
