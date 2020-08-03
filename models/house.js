const mongoose = require('mongoose');
const { Buffer } = require('buffer');

const houseSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  numberOfBedrooms: {
    type: Number,
    required: true
  },
  numberOfBathrooms: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  yearBuilt: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  Sqft: {
    type: Number,
    required: true
  },
  houseImage: {
    type: Buffer,
    required: true
  },
  houseImageType: {
    type: String,
    required: true
  },
  parking: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Agent'
  }
})

houseSchema.virtual('houseImagePath').get(function () {
  if (this.houseImage != null && this.houseImageType != null) {
    return `data:${this.houseImageType};charset=utf-8;base64,${this.houseImage.toString('base64')}`
  }
}
);

module.exports = mongoose.model('House', houseSchema);