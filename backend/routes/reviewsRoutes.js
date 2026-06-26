import { Router } from 'express'
import {
    getAllReviews,
    getReviewsBySpotId,
    getReviewById,
    createNewReview,
    updateReviewById,
    deleteReviewById
} from '../controllers/reviewsController.js'
import requireAuth from '../middleware/requireAuth.js'

const reviewsRouter = Router()

// GET all reviews
reviewsRouter.get("/", getAllReviews)

// GET all reviews for a specific tourist spot
reviewsRouter.get("/spot/:destinationId", getReviewsBySpotId)

// GET a single review by id
reviewsRouter.get("/:id", getReviewById)

// POST a new review
reviewsRouter.post("/", requireAuth, createNewReview)

// PUT a review by id
reviewsRouter.put("/:id", requireAuth, updateReviewById)

// DELETE a review by id
reviewsRouter.delete("/:id", requireAuth, deleteReviewById)

export default reviewsRouter
