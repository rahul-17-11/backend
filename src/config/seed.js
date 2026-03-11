const User = require('../models/User')

const seedAdmin = async () => {
  try {
    const existing = await User.findOne({ username: 'admin' })
    if (!existing) {
      await User.create({
        username: 'admin',
        password: 'admin123',
        fullName: 'System Administrator',
        role:     'admin',
      })
      console.log('Default admin user created  →  username: admin  |  password: admin123')
    }

    // Also seed a loan officer account
    const officer = await User.findOne({ username: 'officer' })
    if (!officer) {
      await User.create({
        username: 'officer',
        password: 'officer123',
        fullName: 'Loan Officer',
        role:     'officer',
      })
      console.log('Default officer user created  →  username: officer  |  password: officer123')
    }
  } catch (error) {
    console.error('Seed error:', error.message)
  }
}

module.exports = seedAdmin
