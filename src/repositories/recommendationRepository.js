import connection from '../database/database.js'


const insertRecommendation = async data => {
	const { name, youtubeLink, score } = data

	const queryString = `
		INSERT INTO recommendations
			(name, youtube_link, score)
			VALUES
			($1, $2, $3);
	`

	const values = [name, youtubeLink, score]

	await connection.query(queryString, values)
}

const getRecommendationById = async id => {

	const queryString = `
		SELECT * FROM recommendations WHERE id = $1;
	`

	const result = await connection.query(queryString, [id])

	return result.rows
}

const addVoteToRecommendation = async id => {
	const queryString = `
		UPDATE recommendations SET score = score + 1 WHERE id = $1;
	`

	await connection.query(queryString, [id])
}

const removeVoteFromRecommendation = async id => {
	const queryString = `
		UPDATE recommendations SET score = score - 1 WHERE id = $1;
	`

	await connection.query(queryString, [id])
}

const deleteRecommendation = async id => {
	const queryString = `
		DELETE FROM recommendations WHERE id = $1;
	`

	await connection.query(queryString, [id])
}

const getTopRecommendations = async amount => {
	const queryString = `
		SELECT * FROM recommendations ORDER BY score DESC LIMIT $1;
	`

	const result = await connection.query(queryString, [amount])

	return result.rows
}

const getRandomRecommendation = async () => {

	const queryString = `
		SELECT * FROM recommendations ORDER BY RANDOM() LIMIT 1;
	`

	const result = await connection.query(queryString)

	if (result.rows.length) return result.rows[0]
	return null
}

const getGoodRecommendation = async () => {

	const queryString = `
		SELECT * FROM recommendations WHERE score > 10 ORDER BY RANDOM() LIMIT 1;
	`

	const result = await connection.query(queryString)

	if (result.rows.length) return result.rows[0]
	return null
}

const getBadRecommendation = async () => {

	const queryString = `
		SELECT * FROM recommendations WHERE score < 10 ORDER BY RANDOM() LIMIT 1;
	`

	const result = await connection.query(queryString)

	if (result.rows.length) return result.rows[0]
	return null
}

export {
	insertRecommendation,
	getRecommendationById,
	addVoteToRecommendation,
	removeVoteFromRecommendation,
	deleteRecommendation,
	getTopRecommendations,
	getRandomRecommendation,
	getGoodRecommendation,
	getBadRecommendation
}