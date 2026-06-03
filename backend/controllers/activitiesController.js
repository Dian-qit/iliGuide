import {
    getActivities,
    getActivitiesBySpot,
    getActivity,
    createActivity,
    updateActivity,
    deleteActivity
} from '../models/activitiesModel.js'

// Get all activities
export const getAllActivities = async (req, res, next) => {
    try {
        const activities = await getActivities()
        res.send(activities)
    } catch (err) {
        next(err)
    }
}

// Get all activities by tourist spot
export const getActivitiesBySpotId = async (req, res, next) => {
    try {
        const destinationId = req.params.destinationId
        const activities = await getActivitiesBySpot(destinationId)
        res.send(activities)
    } catch (err) {
        next(err)
    }
}

// Get a single activity by id
export const getActivityById = async (req, res, next) => {
    try {
        const id = req.params.id
        const activity = await getActivity(id)
        if (activity.length === 0) return res.status(404).send({ message: "Activity not found" })
        res.send(activity[0])
    } catch (err) {
        next(err)
    }
}

// Create a new activity
export const createNewActivity = async (req, res, next) => {
    try {
        const { destinationId, activityName, activityDescription } = req.body
        if (!destinationId || !activityName)
            return res.status(400).send({ message: "Destination ID and activity name are required" })
        const activity = await createActivity(destinationId, activityName, activityDescription)
        res.status(201).send(activity[0])
    } catch (err) {
        next(err)
    }
}

// Update an activity by id
export const updateActivityById = async (req, res, next) => {
    try {
        const id = req.params.id
        const { destinationId, activityName, activityDescription } = req.body
        if (!destinationId || !activityName)
            return res.status(400).send({ message: "Destination ID and activity name are required" })
        const activity = await updateActivity(id, destinationId, activityName, activityDescription)
        if (activity.length === 0) return res.status(404).send({ message: "Activity not found" })
        res.send(activity[0])
    } catch (err) {
        next(err)
    }
}

// Delete an activity by id
export const deleteActivityById = async (req, res, next) => {
    try {
        const id = req.params.id
        const activity = await getActivity(id)
        if (activity.length === 0) return res.status(404).send({ message: "Activity not found" })
        await deleteActivity(id)
        res.status(204).send()
    } catch (err) {
        next(err)
    }
}