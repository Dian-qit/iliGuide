import { Router } from 'express'
import {
    signupTourist,
    loginTourist,
    getAllTourists,
    getTouristById,
    updateTouristById,
    deleteTouristById
} from '../controllers/touristController.js'

const touristRouter = Router()

// ── Auth ──────────────────────────────────────────────────
touristRouter.post('/signup', signupTourist)
touristRouter.post('/login',  loginTourist)

// ── CRUD ──────────────────────────────────────────────────
touristRouter.get('/',     getAllTourists)
touristRouter.get('/:id',  getTouristById)
touristRouter.put('/:id',  updateTouristById)
touristRouter.delete('/:id', deleteTouristById)

export default touristRouter