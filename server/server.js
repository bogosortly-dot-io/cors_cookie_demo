const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware to parse JSON bodies and cookies
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Update this if your React app runs on a different URL/port
  credentials: true,               // Allow cookies to be sent
}));

// Login endpoint that sets a cookie manually
app.post('/login', (req, res) => {
  // In a real app, you'd validate the credentials from req.body.
  // For this demo, we'll assume login is always successful.

  // Define a session value (could be a token or session ID)
  const sessionValue = 'user-session-unique-id';

  // Set the cookie on the response. httpOnly helps prevent client-side JS from accessing the cookie.
  res.cookie('session', sessionValue, {
    httpOnly: true,
    // secure: true, // Uncomment this if you are serving over HTTPS
    // maxAge: 24 * 60 * 60 * 1000, // Optional: set cookie expiration (here, 1 day)
  });

  res.json({ message: 'Logged in successfully', session: sessionValue });
});

// Test endpoint that verifies the cookie is being sent by the front end
app.post('/test', (req, res) => {
  // Access the cookie using req.cookies (populated by cookie-parser)
  const sessionCookie = req.cookies.session;

  if (!sessionCookie) {
    return res.status(401).json({ message: 'Session cookie not found. Please login.' });
  }

  // Optionally, validate the session cookie value.
  if (sessionCookie !== 'user-session-unique-id') {
    return res.status(403).json({ message: 'Invalid session cookie.' });
  }

  res.json({ message: 'Cookie verified successfully!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

