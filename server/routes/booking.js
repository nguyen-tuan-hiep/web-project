const express = require('express');
const router = express.Router();

const {
  createBookings,
  getBookings,
  deleteBooking,
} = require('../controllers/bookingController');

const {
  createReview,
  getPlaceReviews,
} = require('../controllers/reviewController');

router.route('/').get(getBookings).post(createBookings);
router.route('/:id').delete(deleteBooking);
router.route('/:id/review').post(createReview);
router.route('/:id/review').get(getPlaceReviews);

module.exports = router;
