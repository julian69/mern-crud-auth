import { useEffect } from "react"

import { useTasks } from "../context/TaskContext"
import TaskCard from "../components/TaskCard"

export default function TasksPage() {
  const { getTasks, tasks } = useTasks()

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div className="">
      <div className="p-4 flex">
        <h1 className="text-3xl font-bold">Your Tasks</h1>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white border shadow-md rounded-sm mb-4">
          <tbody>
            <tr className="border-b bg-gray-100">
              <th className="text-left p-3 px-5">Date</th>
              <th className="text-left p-3 px-5">Title</th>
              <th className="text-left p-3 px-5">Desctiption</th>
              <th></th>
            </tr>
            {tasks.map(task => <TaskCard key={task._id} task={task} />)}
          </tbody>
        </table>

      </div>
    </div>
  )
}
