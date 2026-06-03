import {
    getReviews,
    getReviewsBySpot,
    getReview,
    createReview,
    updateReview,
    deleteReview
} from '../models/reviewsModel.js'

// Get all reviews
export const getAllReviews = async (req, res, next) => {
    try {
        const reviews = await getReviews()
        res.send(reviews)
    } catch (err) {
        next(err)
    }
}

// Get all reviews for a specific tourist spot
export const getReviewsBySpotId = async (req, res, next) => {
    try {
        const destinationId = req.params.destinationId
        const reviews = await getReviewsBySpot(destinationId)
        res.send(reviews)
    } catch (err) {
        next(err)
    }
}

// Get a review by id
export const getReviewById = async (req, res, next) => {
    try {
        const id = req.params.id
        const review = await getReview(id)
        if (review.length === 0) return res.status(404).send({ message: "Review not found" })
        res.send(review[0])
    } catch (err) {
        next(err)
    }
}

// Create a new review
export const createNewReview = async (req, res, next) => {
    try {
        const { touristId, destinationId, rating, reviewDate, comment } = req.body
        if (!touristId || !destinationId || !rating)
            return res.status(400).send({ message: "Tourist ID, destination ID, and rating are required" })
        if (rating < 1 || rating > 5)
            return res.status(400).send({ message: "Rating must be between 1 and 5" })
        const date = reviewDate || new Date().toISOString().split('T')[0]
        const review = await createReview(touristId, destinationId, rating, date, comment)
        res.status(201).send(review[0])
    } catch (err) {
        next(err)
    }
}

// Update a review by id
export const updateReviewById = async (req, res, next) => {
    try {
        const id = req.params.id
        const { rating, comment } = req.body
        if (!rating) return res.status(400).send({ message: "Rating is required" })
        if (rating < 1 || rating > 5)
            return res.status(400).send({ message: "Rating must be between 1 and 5" })
        const review = await updateReview(id, rating, comment)
        if (review.length === 0) return res.status(404).send({ message: "Review not found" })
        res.send(review[0])
    } catch (err) {
        next(err)
    }
}

// Delete a review by id
export const deleteReviewById = async (req, res, next) => {
    try {
        const id = req.params.id
        const review = await getReview(id)
        if (review.length === 0) return res.status(404).send({ message: "Review not found" })
        await deleteReview(id)
        res.status(204).send()
    } catch (err) {
        next(err)
    }
}