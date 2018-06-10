const mg = require('mongoose')
mg.connect(process.env.uuri)
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