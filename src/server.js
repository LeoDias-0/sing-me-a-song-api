import './setup.js'
import app from './app.js'

const { PORT } = process.env

app.listen(PORT, () => console.log(`The app is running on port ${PORT}`))