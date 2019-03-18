import InternalError from './../errors/InternalError'
import Model from './../models/orders'

class Order {
  constructor (order) {
    this.product = order.product
    this.quantity = order.quantity
  }

  static async getAll () {
    const orders = await Model.find().populate('product')
      .catch(error => { throw new InternalError(error.message) })

    if (orders.length) return orders.map(Model.format)
    return false
  }
}

export default Order
