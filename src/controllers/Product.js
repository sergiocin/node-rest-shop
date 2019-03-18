import InternalError from '../errors/InternalError'
import Model from './../models/product'

class Product {
  constructor (product) {
    this.name = product.name
    this.picture = product.picture
    this.price = product.price
  }

  static getAll () {
    return Model.find()
      .select('_id name picture price')
      .catch(error => { throw new InternalError(error.message) })
  }
}

export default Product
