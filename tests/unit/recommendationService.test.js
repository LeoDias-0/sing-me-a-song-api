import * as recommendationService from '../../src/services/recommendationService.js'
import * as recommendationRepository from '../../src/repositories/recommendationRepository.js'

const sut = recommendationService

describe('POST /recommedations', () => {
	it('Should create a new recommendation', async () => {

		const recommendation = {
			name: 'Chitãozinho E Xororó - Evidências',
			youtubeLink: 'https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO'
		}

		const newInsertRecomedation = jest
			.spyOn(recommendationRepository, 'insertRecommendation')
			.mockImplementationOnce(() => null)


		await sut.addRecommendation(recommendation)

		expect(newInsertRecomedation).toHaveBeenCalledWith({ ...recommendation, score: 0 })
	})

	it('Should upvote an existing recommendation', async () => {

		const recommendationId = 1
		const recommendation = [
			{
				id: recommendationId,
				name: 'Chitãozinho E Xororó - Evidências',
				youtubeLink: 'https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO',
				score: 245
			}
		]

		jest.spyOn(recommendationRepository, 'getRecommendationById')
			.mockImplementationOnce(() => recommendation)

		const newUpVoteRecommendation = jest
			.spyOn(recommendationRepository, 'addVoteToRecommendation')
			.mockImplementationOnce(() => null)


		await sut.addVote(recommendation)

		expect(newUpVoteRecommendation).toHaveBeenCalled()
	})

	it('Should not upvote an inexisting recommendation', async () => {

		const recommendationId = 1
		const recommendation = []

		jest.spyOn(recommendationRepository, 'getRecommendationById')
			.mockImplementationOnce(() => recommendation)

		jest.spyOn(recommendationRepository, 'addVoteToRecommendation')
			.mockImplementationOnce(() => null)


		const result = await sut.addVote(recommendation)

		expect(result).not.toBeTruthy()
	})

	it('Should downvote an existing recommendation', async () => {

		const recommendationId = 1
		const recommendation = [
			{
				id: recommendationId,
				name: 'Chitãozinho E Xororó - Evidências',
				youtubeLink: 'https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO',
				score: -4
			}
		]

		jest.spyOn(recommendationRepository, 'getRecommendationById')
			.mockImplementationOnce(() => recommendation)

		jest.spyOn(recommendationRepository, 'deleteRecommendation')
			.mockImplementationOnce(() => null)

		const newDownVoteRecommendation = jest
			.spyOn(recommendationRepository, 'removeVoteFromRecommendation')
			.mockImplementationOnce(() => null)


		await sut.removeVote(recommendation)

		expect(newDownVoteRecommendation).toHaveBeenCalled()
	})

	it('Should delete an existing recommendation with score -5', async () => {

		const recommendationId = 1
		const recommendation = [
			{
				id: recommendationId,
				name: 'Chitãozinho E Xororó - Evidências',
				youtubeLink: 'https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO',
				score: -5
			}
		]

		jest.spyOn(recommendationRepository, 'getRecommendationById')
			.mockImplementationOnce(() => recommendation)

		jest.spyOn(recommendationRepository, 'removeVoteFromRecommendation')
			.mockImplementationOnce(() => null)

		const newDeleteRecommendation = jest
			.spyOn(recommendationRepository, 'deleteRecommendation')
			.mockImplementationOnce(() => null)


		await sut.removeVote(recommendation)

		expect(newDeleteRecommendation).toHaveBeenCalled()
	})

	it('Should not downvote an inexisting recommendation', async () => {

		const recommendationId = 1
		const recommendation = []

		jest.spyOn(recommendationRepository, 'getRecommendationById')
			.mockImplementationOnce(() => recommendation)

		jest.spyOn(recommendationRepository, 'removeVoteFromRecommendation')
			.mockImplementationOnce(() => null)


		const result = await sut.removeVote(recommendation)

		expect(result).not.toBeTruthy()
	})

})

describe('GET /recommedations/top/:amount', () => {
	it('Should return a list with top recommendations', async () => {

		const recommendations = [
			{
				id: 150,
				name: 'Chitãozinho E Xororó - Evidências',
				youtubeLink: 'https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO',
				score: 245
			},
			{
				id: 12,
				name: 'Falamansa - Xote dos Milagres',
				youtubeLink: 'https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO',
				score: 112
			}
		]

		jest.spyOn(recommendationRepository, 'getTopRecommendations')
			.mockImplementationOnce(() => recommendations)


		const result = await sut.listTop(2)

		expect(result).toMatchObject(recommendations)
	})

})

describe('GET /recommendations/random', () => {
	it('Should return a random good recommendation', async () => {
		const recommendation = {
			id: 150,
			name: 'Chitãozinho E Xororó - Evidências',
			youtubeLink: 'https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO',
			score: 245
		}

		jest.spyOn(Math, 'random')
			.mockImplementationOnce(() => 0.69)

		jest.spyOn(recommendationRepository, 'getGoodRecommendation')
			.mockImplementationOnce(() => recommendation)


		const result = await sut.getRandomRecommendation()

		expect(result).toMatchObject(recommendation)
	})

	it('Should return a random bad recommendation', async () => {
		const recommendation = {
			id: 150,
			name: 'Chitãozinho E Xororó - Evidências',
			youtubeLink: 'https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO',
			score: -3
		}

		jest.spyOn(Math, 'random')
			.mockImplementationOnce(() => 0.71)

		jest.spyOn(recommendationRepository, 'getBadRecommendation')
			.mockImplementationOnce(() => recommendation)


		const result = await sut.getRandomRecommendation()

		expect(result).toMatchObject(recommendation)
	})

	it('Should return a random recommendation when there are not best recommendations', async () => {

		const recommendation = {
			id: 150,
			name: 'Chitãozinho E Xororó - Evidências',
			youtubeLink: 'https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO',
			score: -2
		}

		jest.spyOn(Math, 'random')
			.mockImplementationOnce(() => 0.69)

		jest.spyOn(recommendationRepository, 'getGoodRecommendation')
			.mockImplementationOnce(() => null)


		jest.spyOn(recommendationRepository, 'getRandomRecommendation')
			.mockImplementationOnce(() => recommendation)

		const result = await sut.getRandomRecommendation()

		expect(result).toMatchObject(recommendation)
	})

	it('Should return a random recommendation when there are not worst recommendations', async () => {

		const recommendation = {
			id: 150,
			name: 'Chitãozinho E Xororó - Evidências',
			youtubeLink: 'https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO',
			score: 11
		}

		jest.spyOn(Math, 'random')
			.mockImplementationOnce(() => 0.71)

		jest.spyOn(recommendationRepository, 'getBadRecommendation')
			.mockImplementationOnce(() => null)


		jest.spyOn(recommendationRepository, 'getRandomRecommendation')
			.mockImplementationOnce(() => recommendation)

		const result = await sut.getRandomRecommendation()

		expect(result).toMatchObject(recommendation)
	})
})