const Booking = require('../models/Booking');
const userFromToken = require('../utils/userFromToken');

exports.createBookings = async (req, res) => {
  try {
    const userData = userFromToken(req);
    const infoData = req.body.infoData;
    const booking = await Booking.create({
      user: userData.id,
      place: infoData.place,
      checkIn: infoData.checkIn,
      checkOut: infoData.checkOut,
      numOfGuests: infoData.numOfGuests,
      name: infoData.name,
      phone: infoData.phone,
      price: infoData.price,
    });

    res.status(200).json({
      booking,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (!userData) {
      return res
        .status(401)
        .json({ error: 'You are not authorized to access this page!' });
    }
    const data = await Booking.find({ user: userData.id }).populate('place');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (!userData) {
      return res
        .status(401)
        .json({ error: 'You are not authorized to access this page!' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found',
      });
    }

    if (booking.user.toString() !== userData.id) {
      return res.status(401).json({
        message: 'You are not authorized to delete this booking',
      });
    }

    await booking.remove();
    res.status(200).json({
      message: 'Booking deleted successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};
