const express = require('express')
const {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} = require('../controllers/applicationController')
const { getActivities, createActivity } = require('../controllers/activityController')
const { protect } = require('../middleware/auth')

const router = express.Router()

// All routes require auth
router.use(protect)

// /api/applications
router.get('/',    getApplications)
router.post('/',   createApplication)
router.get('/:id', getApplicationById)
router.put('/:id', updateApplication)
router.delete('/:id', deleteApplication)

// /api/applications/:id/activities
router.get('/:id/activities',  getActivities)
router.post('/:id/activities', createActivity)

module.exports = router
