import { useEffect } from "react"
import { useTasks } from "../context/TaskContext"

export default function TasksPage() {
  const { getTasks, tasks } = useTasks()

  useEffect(() => {
    getTasks()
  }, [])

  if (!tasks.length) return <p>No tasks</p>

  return (
    <div>
      {
        tasks.map(task => (
          <div key={task._id}>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
          </div>
        ))
      }
    </div>
  )
}
