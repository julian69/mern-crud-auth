import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoute from './routes/auth.routes.js'
import tasksRoute from './routes/tasks.routes.js'

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoute)
app.use('/api', tasksRoute)

export default app