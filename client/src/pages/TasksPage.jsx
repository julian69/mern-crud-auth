import { useEffect } from "react"

import { useTasks } from "../context/TaskContext"
import TaskCard from "../components/TaskCard"

export default function TasksPage() {
  const { getTasks, tasks } = useTasks()

  useEffect(() => {
    getTasks()
  }, [])

  return !tasks.length
    ? <p>No tasks</p>
    : (
      <div className="grid grid-cols-3 gap-2">
        {tasks.map(task => <TaskCard key={task._id} task={task} />)}
      </div>
    )
}
