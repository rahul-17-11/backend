const Application = require('../models/Application')
const Activity    = require('../models/Activity')

// GET /api/applications
const getApplications = async (req, res, next) => {
  try {
    const applications = await Application.find()
      .sort({ createdAt: -1 })
      .lean()
    res.status(200).json(applications)
  } catch (error) {
    next(error)
  }
}

// GET /api/applications/:id
const getApplicationById = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id).lean()
    if (!application) {
      return res.status(404).json({ message: 'Application not found.' })
    }
    res.status(200).json(application)
  } catch (error) {
    next(error)
  }
}

// POST /api/applications
const createApplication = async (req, res, next) => {
  try {
    const { applicantName, email, phone, company, loanScheme, status } = req.body

    if (!applicantName || !email) {
      return res.status(400).json({ message: 'Applicant name and email are required.' })
    }

    const application = await Application.create({
      applicantName: applicantName.trim(),
      email:         email.trim().toLowerCase(),
      phone:         phone     || '',
      company:       company   || '',
      loanScheme:    loanScheme|| '',
      status:        status    || 'Submitted',
      createdBy:     req.user._id,
    })

    res.status(201).json(application)
  } catch (error) {
    next(error)
  }
}

// PUT /api/applications/:id
const updateApplication = async (req, res, next) => {
  try {
    const { applicantName, email, phone, company, loanScheme, status } = req.body

    const application = await Application.findById(req.params.id)
    if (!application) {
      return res.status(404).json({ message: 'Application not found.' })
    }

    if (applicantName) application.applicantName = applicantName.trim()
    if (email)         application.email         = email.trim().toLowerCase()
    if (phone  !== undefined) application.phone      = phone
    if (company!== undefined) application.company    = company
    if (loanScheme !== undefined) application.loanScheme = loanScheme
    if (status)        application.status         = status

    const updated = await application.save()
    res.status(200).json(updated)
  } catch (error) {
    next(error)
  }
}

// DELETE /api/applications/:id
const deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id)
    if (!application) {
      return res.status(404).json({ message: 'Application not found.' })
    }

    // Delete associated activities as well
    await Activity.deleteMany({ applicationId: req.params.id })
    await application.deleteOne()

    res.status(200).json({ message: 'Application deleted successfully.' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
}
