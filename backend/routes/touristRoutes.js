import { Router } from 'express'
import {
    signupTourist,
    loginTourist,
    getAllTourists,
    getTouristById,
    updateTouristById,
    deleteTouristById
} from '../controllers/touristController.js'
import requireAuth from '../middleware/requireAuth.js'

const touristRouter = Router()

// ── Auth ──────────────────────────────────────────────────
touristRouter.post('/signup', signupTourist)
touristRouter.post('/login',  loginTourist)

// ── CRUD ──────────────────────────────────────────────────
touristRouter.get('/', requireAuth, getAllTourists)
touristRouter.get('/:id', requireAuth, getTouristById)
touristRouter.put('/:id', requireAuth, updateTouristById)
touristRouter.delete('/:id', requireAuth, deleteTouristById)

export default touristRouter
