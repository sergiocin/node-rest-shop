import { checkSchema } from 'express-validator/check'

export default checkSchema({
  name: { exists: true, in: 'body' },
  picture: { exists: true, in: 'file' },
  price: { exists: true, in: 'body' }
})
