import dotenv from 'dotenv'


const { NODE_ENV } = process.env

const envVariblesPaths = {
	prod: '.env',
	test: '.env.test',
	dev: '.env.test'
}

let path
if (!NODE_ENV) {
	path = '.env.dev'
} else path = envVariblesPaths[NODE_ENV]

dotenv.config({
	path
})