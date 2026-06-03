import { Router } from 'express'
import {
    getAllActivities,
    getActivitiesBySpotId,
    getActivityById,
    createNewActivity,
    updateActivityById,
    deleteActivityById
} from '../controllers/activitiesController.js'

const activitiesRouter = Router()

// GET all activities
activitiesRouter.get("/", getAllActivities)

// GET all activities for a specific tourist spot
activitiesRouter.get("/spot/:destinationId", getActivitiesBySpotId)

// GET a single activity by id
activitiesRouter.get("/:id", getActivityById)

// POST a new activity
activitiesRouter.post("/", createNewActivity)

// PUT an activity by id
activitiesRouter.put("/:id", updateActivityById)

// DELETE an activity by id
activitiesRouter.delete("/:id", deleteActivityById)

export default activitiesRouter