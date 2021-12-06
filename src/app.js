import express from 'express'
import cors from 'cors'

import * as recommendationController from './controllers/recommendationController.js'

const app = express()

app.use(cors())
app.use(express.json())

app.post('/recommendations', recommendationController.createRecommendation)
app.post('/recommendations/:id/upvote', recommendationController.upVoteRecommendation)
app.post('/recommendations/:id/downvote', recommendationController.downVoteRecommendation)
app.get('/recommendations/top/:amount', recommendationController.getTopRecommendations)
app.get('/recommendations/random', recommendationController.getRandomRecommendation)

export default app