const Place = require('../models/Place');
const Booking = require('../models/Booking');
const userFromToken = require('../utils/userFromToken');

exports.addPlace = async (req, res) => {
  try {
    const userData = userFromToken(req);
    const infoData = req.body.placeData;
    const place = await Place.create({
      owner: userData.id,
      title: infoData.title,
      address: infoData.address,
      latitude: infoData.latitude,
      longitude: infoData.longitude,
      photos: infoData.addedPhotos,
      description: infoData.desc,
      perks: infoData.perks,
      extraInfo: infoData.extraInfo,
      checkIn: infoData.checkIn,
      checkOut: infoData.checkOut,
      maxGuests: infoData.maxGuests,
      price: infoData.price,
    });
    res.status(200).json({
      place,
      message: 'Add new place successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json({
      places,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.updatePlace = async (req, res) => {
  try {
    const userData = userFromToken(req);
    const userId = userData.id;
    const infoData = req.body.placeData;
    const place = await Place.findById(infoData.id);
    if (userId === place['owner'].toString()) {
      place.set({
        title: infoData.title,
        address: infoData.address,
        photos: infoData.addedPhotos,
        description: infoData.desc,
        perks: infoData.perks,
        extraInfo: infoData.extraInfo,
        checkIn: infoData.checkIn,
        checkOut: infoData.checkOut,
        maxGuests: infoData.maxGuests,
        price: infoData.price,
      });
    }
    await place.save();
    res.status(200).json({
      message: 'Place updated!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.singlePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await Place.findById(id);
    if (!place) {
      return res.status(400).json({
        message: 'Place not found',
      });
    }
    res.status(200).json({
      place,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal serever error',
    });
  }
};

exports.userPlaces = async (req, res) => {
  try {
    const userData = userFromToken(req);
    const id = userData.id;
    res.status(200).json(await Place.find({ owner: id }));
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.searchPlaces = async (req, res) => {
  try {
    const searchWord = req.params.key;
    const searchRegex = new RegExp(searchWord, 'i');

    if (searchWord === 'undefined') {
      const result = await Place.find();
      return res.status(200).json(result);
    }

    const searchMatches = await Place.find({
      $or: [
        { title: { $regex: searchRegex } },
        { address: { $regex: searchRegex } },
      ],
    });

    res.status(200).json(searchMatches);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.deletePlace = async (req, res) => {
  try {
    const userData = userFromToken(req);
    const userId = userData.id;
    const { id } = req.params;

    const place = await Place.findById(id);
    if (!place) {
      return res.status(400).json({
        message: 'Place not found',
      });
    }

    if (userId === place['owner'].toString()) {
      await Booking.deleteMany({ place: id }); // Delete all bookings related to the place from the database
      await Place.findByIdAndDelete(id);
      res.status(200).json({
        message: 'Place and its bookings deleted!',
      });
    } else {
      res.status(403).json({
        message: 'You are not authorized to delete this place',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};
