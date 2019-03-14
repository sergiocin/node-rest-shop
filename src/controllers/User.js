import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import InternalError from './../errors/InternalError'
import Model from './../models/user'
import ValidationError from './../errors/ValidationError'

class User {
  constructor (user) {
    this._id = user._id
    this.email = user.email
    this.password = user.password
  }

  async delete () {
    const result = await Model.deleteOne({ _id: this._id })
      .catch(error => { throw new InternalError(error.message) })
    if (result.n > 0) return true
    return false
  }

  async login () {
    const user = await this._findUserBy('email')
    if (!user) throw new ValidationError('User not found', 404)

    const match = this._comparePassword(user.password)
    if (match) return this._tokenGenerator(user)
    throw new ValidationError('Invalid username or password', 401)
  }

  async signup () {
    const model = this._setModel()

    // Validate if exists in Database
    const exists = await this._findUserBy('email')
    if (exists) {
      throw new ValidationError('User already registered', 409)
    }

    await model.save().catch(error => { throw new InternalError(error.message) })
  }

  _comparePassword (hashedPassword) {
    const match = bcrypt.compareSync(this.password, hashedPassword)
    if (match) return true
  }

  async _findUserBy () {
    // Query builder
    const query = {}
    for (const argument of arguments) {
      if (!this[argument]) throw new InternalError(`Invalid query argument: ${argument}`)
      query[argument] = this[argument]
    }
    console.log('Query: ', query)
    return Model.findOne(query)
      .catch(error => { throw new InternalError(error.message) })
  }

  _setModel () {
    const hash = bcrypt.hashSync(this.password, 10)

    return new Model({
      _id: new mongoose.Types.ObjectId(),
      email: this.email,
      password: hash
    })
  }

  _tokenGenerator (user) {
    const data = { email: user.email, _id: user._id }
    return jwt.sign(data, process.env.JWT_KEY, { expiresIn: '1h' })
  }
}

export default User
