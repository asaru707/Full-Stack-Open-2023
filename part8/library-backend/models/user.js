const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

const userScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minilength: 3,
  },
  //   name: {
  //     type: String,
  //     required: true,
  //   },
  //   password: {
  //     type: String,
  //     required: true,
  //   },
  favoriteGenre: { type: String },
})

userScheme.plugin(validator)

module.exports = mongoose.model('User', userScheme)
