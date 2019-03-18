import InternalError from '../errors/InternalError'
import Model from './../models/product'
import mongoose from 'mongoose'

class Product {
  constructor (product) {
    this.name = product.name
    this.picture = product.picture
    this.price = product.price
  }

  async create () {
    const model = this._setModel()

    model.save()
      .catch(error => { throw new InternalError(error.message) })
  }

  static getAll () {
    return Model.find()
      .select('_id name picture price')
      .catch(error => { throw new InternalError(error.message) })
  }

  _setModel () {
    return new Model({
      _id: new mongoose.Types.ObjectId(),
      name: this.name,
      picture: this.picture,
      price: this.price
    })
  }
}

export default Product
