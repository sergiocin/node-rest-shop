import { checkSchema } from 'express-validator/check'

export default checkSchema({
  product: { exists: true, in: 'body' },
  quantity: { exists: true, in: 'body', isInt: true }
})
