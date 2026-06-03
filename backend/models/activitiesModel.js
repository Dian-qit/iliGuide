import pool from '../config/db.js'

// Get all activities
export async function getActivities() {
    const [rows] = await pool.query(`
        SELECT a.*, ts.Name AS SpotName
        FROM Activities a
        JOIN TouristSpot ts ON a.DestinationID = ts.DestinationID
    `)
    return rows
}

// Get all activities by tourist spot
export async function getActivitiesBySpot(destinationId) {
    const [rows] = await pool.query(`
        SELECT *
        FROM Activities
        WHERE DestinationID = ?
        `, [destinationId])
    return rows
}

// Get a single activity by id
export async function getActivity(id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM Activities
        WHERE ActivityID = ?
        `, [id])
    return rows
}

// Create a new activity
export async function createActivity(destinationId, activityName, activityDescription) {
    const [result] = await pool.query(`
        INSERT INTO Activities (DestinationID, ActivityName, ActivityDescription)
        VALUES (?, ?, ?)
        `, [destinationId, activityName, activityDescription])
    const id = result.insertId
    return getActivity(id)
}

// Update an activity by id
export async function updateActivity(id, destinationId, activityName, activityDescription) {
    await pool.query(`
        UPDATE Activities
        SET DestinationID = ?, ActivityName = ?, ActivityDescription = ?
        WHERE ActivityID = ?
        `, [destinationId, activityName, activityDescription, id])
    return getActivity(id)
}

// Delete an activity by id
export async function deleteActivity(id) {
    await pool.query(`
        DELETE FROM Activities
        WHERE ActivityID = ?
        `, [id])
}