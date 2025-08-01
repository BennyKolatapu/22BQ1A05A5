const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const loggingMiddleware = require('./loggingMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(loggingMiddleware);

// In-memory store for URL mappings
// Structure: { shortcode: { originalUrl, expiresAt } }
const urlStore = new Map();

// Helper function to generate a random shortcode
function generateShortcode(length = 6) {
  return crypto.randomBytes(length).toString('base64url').slice(0, length);
}

// Helper function to validate custom shortcode
function isValidShortcode(code) {
  return /^[a-zA-Z0-9_-]{4,20}$/.test(code);
}

// Middleware to check shortcode uniqueness
function isShortcodeUnique(code) {
  return !urlStore.has(code);
}

// POST /shorten - Create a short URL
app.post('/shorten', (req, res) => {
  res.status(501).json({ error: 'This endpoint is deprecated. Use POST /shorturls instead.' });
});

// POST /shorturls - Create a short URL
app.post('/shorturls', (req, res) => {
  const { url, validity, shortcode: customShortcode } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'url is required and must be a string' });
  }

  let shortcode = '';

  if (customShortcode) {
    if (!isValidShortcode(customShortcode)) {
      return res.status(400).json({ error: 'Invalid custom shortcode format' });
    }
    if (!isShortcodeUnique(customShortcode)) {
      return res.status(409).json({ error: 'Custom shortcode already in use' });
    }
    shortcode = customShortcode;
  } else {
    // Generate unique shortcode
    do {
      shortcode = generateShortcode();
    } while (!isShortcodeUnique(shortcode));
  }

  // Set expiry time
  const validityMinutes = Number.isInteger(validity) && validity > 0 ? validity : 30;
  const expiresAt = Date.now() + validityMinutes * 60 * 1000;

  urlStore.set(shortcode, { originalUrl: url, expiresAt });

  res.json({
    shortcode,
    originalUrl: url,
    expiresAt: new Date(expiresAt).toISOString(),
  });
});

// GET /:shortcode - Redirect to original URL
app.get('/:shortcode', (req, res) => {
  const { shortcode } = req.params;
  const entry = urlStore.get(shortcode);

  if (!entry) {
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  if (Date.now() > entry.expiresAt) {
    urlStore.delete(shortcode);
    return res.status(410).json({ error: 'Shortcode expired' });
  }

  res.redirect(entry.originalUrl);
});

const axios = require('axios');

// Registration API integration
async function registerUser() {
  const registrationUrl = 'http://20.244.56.144/evaluation-service/register';
  const registrationData = {
    email: 'ramkrishna@abc.edu',
    name: 'Ram Krishna',
    mobileNo: '9999999999',
    githubUsername: 'github',
    rollNo: 'aa1bb',
    accessCode: 'xgAsNC',
  };

  try {
    const response = await axios.post(registrationUrl, registrationData);
    // Registration successful, handle response if needed
  } catch (error) {
    // Handle registration error if needed
  }
}

app.listen(PORT, () => {
  console.log(`URL Shortener service running on port ${PORT}`);
});

// Call registration on startup
registerUser();
