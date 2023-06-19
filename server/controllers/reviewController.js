const Review = require('../models/Review');
const Booking = require('../models/Booking');
const userFromToken = require('../utils/userFromToken');
// Function to create a new review
async function createReview(req, res) {
  try {
    const userData = userFromToken(req);
    console.log(req.body)
    const reviewData = await Review.create({
      user: userData.id,
      place: req.body.placeId,
      booking: req.body.bookingId,
      rating: req.body.rating,
      review: req.body.review
    });
    console.log("a")
    const newReview = await Review.create(reviewData);
    console.log("b")
    res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Function to get all reviews for a place
async function getPlaceReviews(req, res) {
  try {
    const { id } = req.params;

    const reviews = await Review.find({ place: id }).populate('user');

    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { createReview, getPlaceReviews };
