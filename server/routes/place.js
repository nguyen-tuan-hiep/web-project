const express = require('express');
const router = express.Router();

const {
  addPlace,
  getPlaces,
  updatePlace,
  singlePlace,
  userPlaces,
  searchPlaces,
  deletePlace,
  getPlaceReviews,
} = require('../controllers/placeController');

// const { getPlaceReviews } = require('../controllers/reviewController');

router.route('/').get(getPlaces);
router.route('/add-places').post(addPlace);
router.route('/update-place').put(updatePlace);
router.route('/user-places').get(userPlaces);
router.route('/:id').get(singlePlace).delete(deletePlace);
router.route('/search/:key').get(searchPlaces);
router.route('/:id/review').get(getPlaceReviews);

module.exports = router;
