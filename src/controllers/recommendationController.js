import validateRecommendationCreation from '../validations/validateRecommendationCreation.js'

import * as recommendationService from '../services/recommendationService.js'


const createRecommendation = async (req, res) => {

	const isNotAValidRequisition = validateRecommendationCreation.validate(req.body).error

	if (isNotAValidRequisition) return res.sendStatus(422)

	try {
		await recommendationService.addRecommendation(req.body)
		return res.sendStatus(201)
	} catch (error) {

		return res.status(500).send(`
			Error when creating recommendation with requisition data:
			req.body = ${JSON.stringify(req.body)}.
		`)
	}
}

const upVoteRecommendation = async (req, res) => {
	const { id } = req.params

	try {

		const result = await recommendationService.addVote(id)

		if (!result) return res.sendStatus(404)

		return res.sendStatus(200)
	} catch (error) {

		return res.status(500).send(`
			Error when adding a vote to recommendation with id ${id}.
		`)
	}
}

const downVoteRecommendation = async (req, res) => {
	const { id } = req.params

	try {

		const result = await recommendationService.removeVote(id)

		if (!result) return res.sendStatus(404)

		return res.sendStatus(200)
	} catch (error) {

		return res.status(500).send(`
			Error when downvoting recommendation with id ${id}.
		`)
	}
}

const getTopRecommendations = async (req, res) => {
	const { amount } = req.params

	try {

		const result = await recommendationService.listTop(amount)

		return res.status(200).send(result)
	} catch (error) {

		return res.status(500).send(`
			Error when listing top recommendations with amount ${amount}.
		`)
	}
}

const getRandomRecommendation = async (req, res) => {

	try {

		const result = await recommendationService.getRandomRecommendations()

		if (result.length === 0) return res.sendStatus(404)

		return res.status(200).send(result)
	} catch (error) {

		return res.status(500).send(`
			Error when listing random recommendations.
		`)
	}
}

export {
	createRecommendation,
	upVoteRecommendation,
	downVoteRecommendation,
	getTopRecommendations,
	getRandomRecommendation
}