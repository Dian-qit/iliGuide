import { Router } from 'express'
import {
    getAllTouristSpots,
    getTouristSpotById,
    createNewTouristSpot,
    updateTouristSpotById,
    deleteTouristSpotById
} from '../controllers/touristSpotController.js'

const touristSpotRouter = Router()

// GET all tourist spots
touristSpotRouter.get("/", getAllTouristSpots)

// GET a tourist spot by id
touristSpotRouter.get("/:id", getTouristSpotById)

// POST a new tourist spot
touristSpotRouter.post("/", createNewTouristSpot)

// PUT a tourist spot by id
touristSpotRouter.put("/:id", updateTouristSpotById)

// DELETE a tourist spot by id
touristSpotRouter.delete("/:id", deleteTouristSpotById)

export default touristSpotRouter