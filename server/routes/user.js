const express = require('express');
const router = express.Router();

const {
  register,
  login,
  profile,
  logout,
  getAllUsers,
  updateProfile,
} = require('../controllers/userController');

router.route('/').get(getAllUsers);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/profile').get(profile);
router.route('/logout').post(logout);
router.route('/update/:id').post(updateProfile);

module.exports = router;
