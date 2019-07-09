const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AuthorSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  firstName: {
    type: String,
    default: '',
    trim: true
  },
  lastName: {
    type: String,
    default: '',
    trim: true
  },
  articles: [{
    type: Schema.Types.ObjectId,
    ref: 'Article'
  }]
})

AuthorSchema.path('firstName').validate(function (firstName) {
  return firstName.length
}, 'First name cannot be blank')

AuthorSchema.path('lastName').validate(function (lastName) {
  return lastName.length
}, 'Last name cannot be blank')

AuthorSchema.statics = {
  load: function (id, cb) {
    this.findOne({
      _id: id
    }).exec(cb)
  }
}

mongoose.model('Author', AuthorSchema)
