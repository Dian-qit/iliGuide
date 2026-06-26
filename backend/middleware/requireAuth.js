import jwt from 'jsonwebtoken'
import { getTourist } from '../models/touristModel.js'

const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token required' })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        const tourist = await getTourist(decoded.id)

        if (tourist.length === 0) {
            return res.status(401).json({ message: 'User no longer exists' })
        }

        req.user = {
            id: tourist[0].TouristID,
            tourist: tourist[0],
        }

        next()
    } catch (error) {
        res.status(401).json({ message: 'Request is not authorized' })
    }
}

export default requireAuth
