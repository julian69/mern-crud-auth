import { createContext, useContext, useState } from 'react'
import { createTaskRequest, deleteTaskRequest, getTasksRequest, updateTaskRequest } from '../api/tasks'

const TaskContext = createContext()

export const useTasks = () => {
  const context = useContext(TaskContext)
  if (!context) throw new Error('useTasks must be used within a TaskProvider')
  return context
}

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])

  const getTasks = async () => {
    try {
      const res = await getTasksRequest()
      setTasks(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const createTask = async (task) => {
    try {
      await createTaskRequest(task)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id)
      if (res.status === 204) {
        setTasks(tasks.filter(task => task._id !== id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task)
      getTasks()
    } catch (error) {
      console.log(error)
    }
  }

  return <TaskContext.Provider value={{
    tasks,
    createTask,
    getTasks,
    deleteTask,
    updateTask
  }}>
    {children}
  </TaskContext.Provider>
}
