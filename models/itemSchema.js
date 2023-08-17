const item = require('./item')

const Schema = require('mongoose').Schema

const itemSchema = new Schema({
  name: String,
  emoji: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number, required: true, default: 0 }
}, {
  timestamps: true
})

module.exports = itemSchema
