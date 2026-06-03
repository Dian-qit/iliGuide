import pool from '../config/db.js'
import bcrypt from 'bcrypt'
import validator from 'validator'

// ── Auth ──────────────────────────────────────────────────

export async function signup(name, email, password) {
    if (!name || !email || !password) {
        throw new Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw new Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password not strong enough — use 8+ characters, uppercase, number, and symbol')
    }

    const [existing] = await pool.query(
        'SELECT TouristID FROM Tourist WHERE Email = ?', [email]
    )
    if (existing.length > 0) {
        throw new Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const [result] = await pool.query(
        'INSERT INTO Tourist (Name, Email, Password) VALUES (?, ?, ?)',
        [name, email, hash]
    )

    return getTourist(result.insertId)
}

export async function login(email, password) {
    if (!email || !password) {
        throw new Error('All fields must be filled')
    }

    // Fetch including Password for comparison
    const [rows] = await pool.query(
        'SELECT * FROM Tourist WHERE Email = ?', [email]
    )
    if (rows.length === 0) {
        throw new Error('Incorrect email')
    }

    const tourist = rows[0]

    const match = await bcrypt.compare(password, tourist.Password)
    if (!match) {
        throw new Error('Incorrect password')
    }

    // Return without password
    const { Password, ...safeTourist } = tourist
    return safeTourist
}

// ── CRUD ──────────────────────────────────────────────────

export async function getTourists() {
    const [rows] = await pool.query('SELECT TouristID, Name, Email FROM Tourist')
    return rows
}

export async function getTourist(id) {
    const [rows] = await pool.query(
        'SELECT TouristID, Name, Email FROM Tourist WHERE TouristID = ?', [id]
    )
    return rows
}

export async function updateTourist(id, name, email) {
    await pool.query(
        'UPDATE Tourist SET Name = ?, Email = ? WHERE TouristID = ?',
        [name, email, id]
    )
    return getTourist(id)
}

export async function deleteTourist(id) {
    await pool.query('DELETE FROM Tourist WHERE TouristID = ?', [id])
}