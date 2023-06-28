const User = require('../models/User');
const bcrypt = require('bcryptjs');
const userFromToken = require('../utils/userFromToken');

const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'name, email and password are required',
      });
    }

    // check if user already registered
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: 'User already registered',
      });
    }

    user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const validatedPassword = await bcrypt.compare(password, user.password);
      if (validatedPassword) {
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRY,
          }
        );

        user.password = undefined;

        res.status(200).json({
          user,
          token,
        });
      } else {
        res.status(401).json({
          message: 'email or password is incorrect',
        });
      }
    } else {
      res.status(400).json({
        message: 'User not found',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
};

exports.profile = async (req, res) => {
  try {
    const userData = userFromToken(req);
    if (userData) {
      const { name, email, description, profilePicture, _id } =
        await User.findById(userData.id);
      res.status(200).json({ name, email, description, profilePicture, _id });
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
};

exports.logout = async (req, res) => {
  res.cookie('token', '').json({
    message: 'logged out successfully!',
  });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server Error',
      error: err,
    });
  }
};

// create controller to update description, name, email
exports.updateProfile = async (req, res) => {
  try {
    const { description, name, email } = req.body;
    const userId = userFromToken(req).id;

    // check if new email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json({
        message: 'Email is already registered',
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { description, name, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    // It's a good practice to remove sensitive data before sending the response
    updatedUser.password = undefined;

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.deleteProfilePicture = async (req, res) => {
  console.log('deleteProfilePicture');
  try {
    const userId = userFromToken(req).id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the profile picture URL from the user document
    user.profilePicture = undefined;
    await user.save();

    res.json({ message: 'Profile picture deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
