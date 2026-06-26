import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import touristRouter from './routes/touristRoutes.js'
import touristSpotRouter from './routes/touristSpotRoutes.js'
import activitiesRouter from './routes/activitiesRoutes.js'
import reviewsRouter from './routes/reviewsRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080


//middleware
app.use(express.json())
// app.use(cors({
//     origin: 'http://localhost:5173',
// }))
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://iliguide.vercel.app',
    ],
}))


app.use('/api/tourists', touristRouter)
app.use('/api/spots', touristSpotRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/reviews', reviewsRouter)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Error')
})

app.listen(PORT, () => {
    console.log(`Server is running on port PORT: ${PORT}`)
})