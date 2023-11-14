import { Router } from 'express'
import { authRequired } from '../middlewares/tokenValidator.middleware.js'
import { deleteTask, getTasks, updateTask, createTask, getTask } from '../controllers/tasks.controller.js'
import { validateSchema } from '../middlewares/accesValidator.middleware.js'
import { createTaskSchema } from '../schemas/task.schema.js'

const router = Router()

router.get('/tasks', authRequired, getTasks)
router.get('/tasks/:id', authRequired, getTask)
router.post('/tasks', authRequired, validateSchema(createTaskSchema), createTask)
router.delete('/tasks/:id', authRequired, deleteTask)
router.put('/tasks/:id', authRequired, updateTask)

export default router