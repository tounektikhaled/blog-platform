const express = require('express');
const { loginUser } = require('../resolvers/userResolvers');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await loginUser(null, { username, password });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
