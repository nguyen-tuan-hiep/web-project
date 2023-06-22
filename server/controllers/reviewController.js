const Review = require('../models/Review');
const Booking = require('../models/Booking');
const userFromToken = require('../utils/userFromToken');
// Function to create a new review
async function createReview(req, res) {
  try {
    const userData = userFromToken(req);
    const bookingId = req.body.bookingId;
    
    // Check if the booking exists and retrieve the check-out date
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(414).json({ success: false, error: 'Booking not found' });
    }
    const checkOutDate = booking.checkOut;
    
    // Check if the review date is after the check-out date
    const reviewDate = new Date();
    if (reviewDate <= checkOutDate) {
      return res.status(456).json({ success: false, error: 'Cannot review before check-out' });
    }

    // Check if a review for this booking ID already exists
    const existingReview = await Review.findOne({ booking: bookingId });
    if (existingReview) {
      return res.status(445).json({ success: false, error: 'Review already exists for this booking' });
    }
    
    const reviewData = await Review.create({
      user: userData.id,
      place: req.body.placeId,
      booking: bookingId,
      rating: req.body.rating,
      review: req.body.review
    });
    const newReview = await Review.create(reviewData);
    res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Function to get all reviews for a place
async function getPlaceReviews(req, res) {
  try {
    const { id } = req.params;

    const reviews = await Review.find({ place: id }).populate('user', 'name');

    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { createReview, getPlaceReviews };
