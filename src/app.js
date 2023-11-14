import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import authRoute from './routes/auth.routes.js'
import tasksRoute from './routes/tasks.routes.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoute)
app.use('/api', tasksRoute)

export default app