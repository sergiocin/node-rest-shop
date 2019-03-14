class InternalError extends Error {
  constructor (message) {
    super(message)
    this.name = 'InternalError'
    this.code = 500
  }
}

export default InternalError
