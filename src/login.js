const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Hardcoded users array
const users = [
  { username: 'admin', password: 'password123' },
  { username: 'user', password: 'userpass' },
  { username: 'test', password: 'testpass' }
];

// POST /login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find user in hardcoded array
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Generate simple token (in production, use proper JWT)
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// GET /debug endpoint
app.get('/debug', (req, res) => {
  res.json(process.env);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
