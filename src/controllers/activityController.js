const Activity    = require('../models/Activity')
const Application = require('../models/Application')

// GET /api/applications/:id/activities
const getActivities = async (req, res, next) => {
  try {
    // Verify the application exists
    const application = await Application.findById(req.params.id)
    if (!application) {
      return res.status(404).json({ message: 'Application not found.' })
    }

    const activities = await Activity.find({ applicationId: req.params.id })
      .sort({ date: -1 })
      .lean()

    res.status(200).json(activities)
  } catch (error) {
    next(error)
  }
}

// POST /api/applications/:id/activities
const createActivity = async (req, res, next) => {
  try {
    const { type, notes, date, nextActionDate } = req.body

    // Verify the application exists
    const application = await Application.findById(req.params.id)
    if (!application) {
      return res.status(404).json({ message: 'Application not found.' })
    }

    if (!type) {
      return res.status(400).json({ message: 'Activity type is required.' })
    }

    const activity = await Activity.create({
      applicationId: req.params.id,
      type,
      notes:          notes          || '',
      date:           date           ? new Date(date) : new Date(),
      nextActionDate: nextActionDate ? new Date(nextActionDate) : null,
      createdBy:      req.user._id,
    })

    res.status(201).json(activity)
  } catch (error) {
    next(error)
  }
}

module.exports = { getActivities, createActivity }
