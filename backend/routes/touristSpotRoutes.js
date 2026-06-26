import { Router } from 'express'
import {
    getAllTouristSpots,
    getTouristSpotById,
    createNewTouristSpot,
    updateTouristSpotById,
    deleteTouristSpotById
} from '../controllers/touristSpotController.js'
import requireAuth from '../middleware/requireAuth.js'

const touristSpotRouter = Router()

// GET all tourist spots
touristSpotRouter.get("/", getAllTouristSpots)

// GET a tourist spot by id
touristSpotRouter.get("/:id", getTouristSpotById)

// POST a new tourist spot
touristSpotRouter.post("/", requireAuth, createNewTouristSpot)

// PUT a tourist spot by id
touristSpotRouter.put("/:id", requireAuth, updateTouristSpotById)

// DELETE a tourist spot by id
touristSpotRouter.delete("/:id", requireAuth, deleteTouristSpotById)

export default touristSpotRouter
