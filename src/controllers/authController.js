const jwt  = require('jsonwebtoken')
const User = require('../models/User')

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  })
}

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' })
    }

    // Find user
    const user = await User.findOne({ username: username.toLowerCase().trim() })
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' })
    }

    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password.' })
    }

    const token = generateToken(user._id)

    res.status(200).json({
      token,
      user: {
        id:       user._id,
        username: user.username,
        fullName: user.fullName,
        role:     user.role,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { login }
