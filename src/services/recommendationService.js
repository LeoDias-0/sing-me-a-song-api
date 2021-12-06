import * as recommendationRepository from '../repositories/recommendationRepository.js'


const addRecommendation = async data => {
	await recommendationRepository.insertRecommendation({ ...data, score: 0 })
}

const addVote = async id => {

	const recommendation = await recommendationRepository.getRecommendationById(id)

	if (recommendation.length === 0) return false

	await recommendationRepository.addVoteToRecommendation(id)
	return true
}

const removeVote = async id => {

	const recommendation = await recommendationRepository.getRecommendationById(id)

	if (recommendation.length === 0) return false

	if (recommendation[0].score <= -5) {
		await recommendationRepository.deleteRecommendation(id)
	} else {
		await recommendationRepository.removeVoteFromRecommendation(id)
	}

	return true
}

const listTop = async amount => {
	return await recommendationRepository.getTopRecommendations(amount)
}

const getRandomRecommendation = async () => {
	const shouldRecommendBest = Math.random() < 0.7
	if (shouldRecommendBest) {
		const result = await recommendationRepository.getGoodRecommendation()
		if (result) return result
	} else {
		const result = await recommendationRepository.getBadRecommendation()
		if (result) return result
	}

	return await recommendationRepository.getRandomRecommendation()
}

export {
	addRecommendation,
	addVote,
	removeVote,
	listTop,
	getRandomRecommendation
}