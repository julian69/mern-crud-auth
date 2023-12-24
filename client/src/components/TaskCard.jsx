import React from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { Button } from "../components/Button"
import { useTasks } from '../context/TaskContext'
import { Link } from 'react-router-dom'

dayjs.extend(utc)

export default function TaskCard({ task }) {
  const { deleteTask } = useTasks()

  return (
    <tr className="border-b hover:bg-gray-100 cursor-pointer">
      <td className="p-3 px-5">
        {dayjs.utc(task.date).format("DD/MM/YYYY")}
      </td>
      <td className="p-3 px-5">
        {task.title}
      </td>
      <td className="p-3 px-5">
        {task.description}
      </td>
      <td className="p-3 px-5 flex justify-end">
        <Link
          to={`/tasks/${task._id}`}
          className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</Link>
        <button
          type="button"
          className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => deleteTask(task._id)}>Delete</button>
      </td>
    </tr>
  )
}
