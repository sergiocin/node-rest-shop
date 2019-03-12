import { checkSchema } from 'express-validator/check'

export default checkSchema({
  email: { in: 'body', isEmail: true },
  password: { exists: true, in: 'body' }
})
