import { Router } from 'express'

import { login, logout, register, profile } from '../controllers/auth.controller.js'
import { authRequired } from '../middlewares/tokenValidator.middleware.js'
import { validateSchema } from '../middlewares/accesValidator.middleware.js'
import { loginSchema, registerSchema } from '../schemas/auth.schema.js'

const router = Router()

router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/profile', authRequired, profile)

export default router