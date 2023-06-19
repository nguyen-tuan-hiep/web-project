const express = require('express');
const router = express.Router();

const {
  createBookings,
  getBookings,
  deleteBooking,
} = require('../controllers/bookingController');

const { createReview } = require('../controllers/reviewController');

router.route('/').get(getBookings).post(createBookings);
router.route('/:id').delete(deleteBooking);
router.route('/:id/review').post(createReview);

module.exports = router;
