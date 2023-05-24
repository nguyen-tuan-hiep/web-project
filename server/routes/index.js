const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const opencage = require('opencage-api-client');
const dotenv = require('dotenv');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
dotenv.config();

// multer
const upload = multer({ dest: '/temp' });

router.get('/', (req, res) => {
  res.status(200).json({
    greeting: 'Hello from airbnb-clone api',
  });
});

router.get('/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/checkout', async (req, res) => {
  const { price, title, photo } =
    req.body.infoData;

  try {
    // Create a new Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price * 100,
            product_data: {
              name: `Reservation for ${title}`,
              images: [photo],
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/account/bookings',
      cancel_url: 'http://localhost:5173/123',
      metadata: {
        title,
        photo,
      },
    });
    // Return session ID to client
    return res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

router.get('/reverse-geocode', (req, res) => {
  try {
    const lat = req.query.lat;
    const lng = req.query.lng;
    opencage
      .geocode({ q: `${lat}, ${lng}`, language: 'en' })
      .then((data) => {
        // console.log(JSON.stringify(data));
        if (data.status.code === 200 && data.results.length > 0) {
          const place = data.results[0];
          const address = place.formatted;
          res.status(200).json({ address });
        } else {
          res.status(400).json({ error: 'Unable to get address' });
        }
      })
      .catch((error) => {
        console.log('error', error.message);
        if (error.status.code === 402) {
          console.log('hit free trial daily limit');
          console.log('become a customer: https://opencagedata.com/pricing');
        }
        res.status(500).json({ error: 'Internal server error' });
      });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// upload photo using image url
router.post('/upload-by-link', async (req, res) => {
  try {
    const { link } = req.body;
    let result = await cloudinary.uploader.upload(link, {
      folder: 'Airbnb/Places',
    });
    res.json(result.secure_url);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
});

// upload images from local device
router.post('/upload', upload.array('photos', 100), async (req, res) => {
  try {
    let imageArray = [];

    for (let index = 0; index < req.files.length; index++) {
      let { path } = req.files[index];
      let result = await cloudinary.uploader.upload(path, {
        folder: 'Airbnb/Places',
      });
      imageArray.push(result.secure_url);
    }

    res.status(200).json(imageArray);
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({
      error,
      message: 'Internal server error',
    });
  }
});

router.use('/user', require('./user'));
router.use('/places', require('./place'));
router.use('/bookings', require('./booking'));
router.use('/chatbot', require('./chatbot'));

module.exports = router;
