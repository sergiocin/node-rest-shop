class ValidationError extends Error {
  constructor (message, code = 422) {
    super(message)
    this.name = 'ValidationError'
    this.code = code
  }
}

module.exports = ValidationError
