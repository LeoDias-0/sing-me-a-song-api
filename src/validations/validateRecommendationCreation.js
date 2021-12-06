import joi from 'joi'


const youtubeLinkPattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/watch\?v=([^&]+)/m

const validateRecommendationCreation = joi.object({
	name: joi.string().min(1).required(),
	youtubeLink: joi.string().regex(youtubeLinkPattern).required()
}).length(2)

export default validateRecommendationCreation