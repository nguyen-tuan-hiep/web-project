const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  photos: [{ type: String }],
  description: {
    type: String,
  },
  perks: [{ type: String }],
  extraInfo: {
    type: String,
  },
  checkIn: {
    type: Number,
    required: true,
  },
  checkOut: {
    type: Number,
    required: true,
  },
  maxGuests: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
