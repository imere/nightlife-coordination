import mg from 'mongoose'

import ENV from '../config/env'

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
      validator: function (v) {
        return /^[a-zA-Z]{1}[0-9a-zA-Z]{4,9}$/.test(v)
      }
    }
  },
  pass: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9a-zA-Z]{5,15}$/.test(v)
      }
    }
  },
  marks: Array
})
const Users = mg.model('users', userSchema)
module.exports = Users
