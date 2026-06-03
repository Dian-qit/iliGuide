import { signup, login, getTourists, getTourist, updateTourist, deleteTourist } from '../models/touristModel.js'
import jwt from 'jsonwebtoken'

// ── Token helper ──────────────────────────────────────────

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '3d' })
}

// ── Auth ──────────────────────────────────────────────────

export const signupTourist = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const tourist = await signup(name, email, password)
        const token = createToken(tourist[0].TouristID)
        res.status(201).json({ tourist: tourist[0], token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const loginTourist = async (req, res) => {
    const { email, password } = req.body
    try {
        const tourist = await login(email, password)
        const token = createToken(tourist.TouristID)
        res.status(200).json({ tourist, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// ── CRUD ──────────────────────────────────────────────────

export const getAllTourists = async (req, res, next) => {
    try {
        const tourists = await getTourists()
        res.send(tourists)
    } catch (err) {
        next(err)
    }
}

export const getTouristById = async (req, res, next) => {
    try {
        const tourist = await getTourist(req.params.id)
        if (tourist.length === 0) return res.status(404).send({ message: 'Tourist not found' })
        res.send(tourist[0])
    } catch (err) {
        next(err)
    }
}

export const updateTouristById = async (req, res, next) => {
    try {
        const { name, email } = req.body
        if (!name || !email) return res.status(400).send({ message: 'Name and email are required' })
        const tourist = await updateTourist(req.params.id, name, email)
        if (tourist.length === 0) return res.status(404).send({ message: 'Tourist not found' })
        res.send(tourist[0])
    } catch (err) {
        next(err)
    }
}

export const deleteTouristById = async (req, res, next) => {
    try {
        const tourist = await getTourist(req.params.id)
        if (tourist.length === 0) return res.status(404).send({ message: 'Tourist not found' })
        await deleteTourist(req.params.id)
        res.status(204).send()
    } catch (err) {
        next(err)
    }
}