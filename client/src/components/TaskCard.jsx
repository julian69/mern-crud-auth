import React from 'react'

import { Button } from "../components/Button"
import { useTasks } from '../context/TaskContext'
import { Link } from 'react-router-dom'

export default function TaskCard({ task }) {
  const { deleteTask } = useTasks()

  return (
    <div>
      <div className="bg-zinc-800 max-w-md w-full p-5">
        <header className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{task.title}</h2>
          <div className="flex gap-x-2 items-center">
            <Button value="Delete" onClick={() => deleteTask(task._id)} />
            <Link to={`/tasks/${task._id}`}>Edit</Link>
          </div>
        </header>
        <p className="text-slate-300">{task.description}</p>
        <p className="text-slate-300">{new Date(task.date).toLocaleString()}</p>
      </div>
    </div>
  )
}
