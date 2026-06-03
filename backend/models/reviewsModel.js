import pool from '../config/db.js'

// Get all reviews
export async function getReviews() {
    const [rows] = await pool.query(`
        SELECT r.*, t.Name AS TouristName, ts.Name AS SpotName, ts.Address, ts.City, ts.ImageURL
        FROM Reviews r
        JOIN Tourist t ON r.TouristID = t.TouristID
        JOIN TouristSpot ts ON r.DestinationID = ts.DestinationID
    `)
    return rows
}

// Get all reviews for a specific tourist spot
export async function getReviewsBySpot(destinationId) {
    const [rows] = await pool.query(`
        SELECT r.*, t.Name AS TouristName, ts.Name AS SpotName, ts.Address, ts.City, ts.ImageURL
        FROM Reviews r
        JOIN Tourist t ON r.TouristID = t.TouristID
        JOIN TouristSpot ts ON r.DestinationID = ts.DestinationID
        WHERE r.DestinationID = ?
        `, [destinationId])
    return rows
}

// Get a single review by id
export async function getReview(id) {
    const [rows] = await pool.query(`
        SELECT r.*, t.Name AS TouristName, ts.Name AS SpotName, ts.Address, ts.City, ts.ImageURL
        FROM Reviews r
        JOIN Tourist t ON r.TouristID = t.TouristID
        JOIN TouristSpot ts ON r.DestinationID = ts.DestinationID
        WHERE r.ReviewID = ?
        `, [id])
    return rows
}

// Create a new review
export async function createReview(touristId, destinationId, rating, reviewDate, comment) {
    const [result] = await pool.query(`
        INSERT INTO Reviews (TouristID, DestinationID, Rating, ReviewDate, Comment)
        VALUES (?, ?, ?, ?, ?)
        `, [touristId, destinationId, rating, reviewDate, comment])
    const id = result.insertId
    return getReview(id)
}

// Update a review by id
export async function updateReview(id, rating, comment) {
    await pool.query(`
        UPDATE Reviews
        SET Rating = ?, Comment = ?
        WHERE ReviewID = ?
        `, [rating, comment, id])
    return getReview(id)
}

// Delete a review by id
export async function deleteReview(id) {
    await pool.query(`
        DELETE FROM Reviews
        WHERE ReviewID = ?
        `, [id])
}