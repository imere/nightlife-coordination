import mg from 'mongoose'

import * as ENV from '../config/env'
import { validatePassword, validateUsername } from '../config/validator'

mg.connect(ENV.uuri || 'mongodb://127.0.0.1:27017/nightlife', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const userSchema = mg.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validateUsername
    }
  },
  pass: {
    type: String,
    required: true,
    validate: {
      validator: validatePassword
    }
  },
  marks: Array
})

const Users = mg.model('users', userSchema)
export default Users
