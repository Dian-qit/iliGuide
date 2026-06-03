import pool from '../config/db.js'

// Get all tourist spots
export async function getTouristSpots() {
    const [rows] = await pool.query("SELECT * FROM TouristSpot")
    return rows
}

// Get a tourist spot by id
export async function getTouristSpot(id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM TouristSpot
        WHERE DestinationID = ?
        `, [id])
    return rows
}

// Create a new tourist spot
export async function createTouristSpot(name, address, city, description, experience, imageURL, embedMapURL) {
    const [result] = await pool.query(`
        INSERT INTO TouristSpot (Name, Address, City, Description, Experience, ImageURL, EmbedMapURL)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [name, address, city, description, experience, imageURL, embedMapURL])
    const id = result.insertId
    return getTouristSpot(id)
}

// Update a tourist spot by id
export async function updateTouristSpot(id, name, address, city, description, experience, imageURL, embedMapURL) {
    await pool.query(`
        UPDATE TouristSpot
        SET Name = ?, Address = ?, City = ?, Description = ?, Experience = ?, ImageURL = ?, EmbedMapURL = ?
        WHERE DestinationID = ?
        `, [name, address, city, description, experience, imageURL, embedMapURL, id])
    return getTouristSpot(id)
}

// Delete a tourist spot by id
export async function deleteTouristSpot(id) {
    await pool.query(`
        DELETE FROM TouristSpot
        WHERE DestinationID = ?
        `, [id])
}