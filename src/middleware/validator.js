import { validationResult } from 'express-validator/check'

function format (error) {
  return { message: `Required or invalid param: ${error.param}` }
}

export default (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(format)
    })
  }
  return next()
}
