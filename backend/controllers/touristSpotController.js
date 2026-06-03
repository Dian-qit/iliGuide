import {
    getTouristSpots,
    getTouristSpot,
    createTouristSpot,
    updateTouristSpot,
    deleteTouristSpot
} from '../models/touristSpotModel.js'

// Get all tourist spots
export const getAllTouristSpots = async (req, res, next) => {
    try {
        const spots = await getTouristSpots()
        res.send(spots)
    } catch (err) {
        next(err)
    }
}

// Get a tourist spot by id
export const getTouristSpotById = async (req, res, next) => {
    try {
        const id = req.params.id
        const spot = await getTouristSpot(id)
        if (spot.length === 0) return res.status(404).send({ message: "Tourist spot not found" })
        res.send(spot[0])
    } catch (err) {
        next(err)
    }
}

// Create a new tourist spot
export const createNewTouristSpot = async (req, res, next) => {
    try {
        const { name, address, city, description, experience, imageURL, embedMapURL, entranceFee } = req.body
        if (!name || !city)
            return res.status(400).send({ message: "Name and city are required" })
        const spot = await createTouristSpot(name, address, city, description, experience, imageURL, embedMapURL, entranceFee)
        res.status(201).send(spot[0])
    } catch (err) {
        next(err)
    }
}

// Update a tourist spot by id
export const updateTouristSpotById = async (req, res, next) => {
    try {
        const id = req.params.id
        const { name, address, city, description, experience, imageURL, embedMapURL, entranceFee } = req.body
        if (!name || !city)
            return res.status(400).send({ message: "Name and city are required" })
        const spot = await updateTouristSpot(id, name, address, city, description, experience, imageURL, embedMapURL, entranceFee)
        if (spot.length === 0) return res.status(404).send({ message: "Tourist spot not found" })
        res.send(spot[0])
    } catch (err) {
        next(err)
    }
}

// Delete a tourist spot by id
export const deleteTouristSpotById = async (req, res, next) => {
    try {
        const id = req.params.id
        const spot = await getTouristSpot(id)
        if (spot.length === 0) return res.status(404).send({ message: "Tourist spot not found" })
        await deleteTouristSpot(id)
        res.status(204).send()
    } catch (err) {
        next(err)
    }
}