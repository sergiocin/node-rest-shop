import InternalError from './../errors/InternalError'
import ValidationError from './../errors/ValidationError'
import Model from './../models/orders'
import Product from './../controllers/Product'
import mongoose from 'mongoose'

class Order {
  constructor (order) {
    this.product = order.product
    this.quantity = order.quantity
  }

  async create () {
    const product = await Product.findById(this.product)
    if (!product) throw new ValidationError('Invalid Product')

    const model = this._setModel()
    return model.save().catch(error => { throw new InternalError(error.message) })
  }

  static async delete (id) {
    const result = await Model.deleteOne({ _id: id })
      .catch(error => { throw new InternalError(error.message) })
    if (result.n > 0) return true
    return false
  }

  static async findById (id) {
    const order = await Model.findById({ _id: id })
      .catch(error => { throw new InternalError(error.message) })
    return Model.format(order)
  }

  static async getAll () {
    const orders = await Model.find().populate('product')
      .catch(error => { throw new InternalError(error.message) })

    if (orders.length) return orders.map(Model.format)
    return false
  }

  _setModel () {
    return new Model({
      _id: mongoose.Types.ObjectId(),
      product: this.product,
      quantity: this.quantity
    })
  }
}

export default Order
