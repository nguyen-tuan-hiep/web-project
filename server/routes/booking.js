const express = require('express');
const router = express.Router();

const {
  createBookings,
  getBookings,
  deleteBooking,
} = require('../controllers/bookingController');

router.route('/').get(getBookings).post(createBookings);
router.route('/:id').delete(deleteBooking);

module.exports = router;
