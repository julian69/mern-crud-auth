import { useForm } from "react-hook-form"

import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useTasks } from "../context/TaskContext"
import { useNavigate } from "react-router-dom"

export default function TaskFormPage() {
  const { register, handleSubmit } = useForm()
  const { createTask } = useTasks()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(data => {
    createTask(data)
    navigate('/tasks')
  })

  // TODO: textarea class ==  input class
  // TODO: form wrapper to components
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={e => onSubmit(e)}>
          <h1 className="text-2xl font-bold">New task</h1>
          <Input
            type="text"
            placeholder="Title"
            className="w-full bg"
            {...register("title")}
          />
          <textarea
            rows="3"
            placeholder="Description"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            {...register("description")}></textarea>
          <Button value="Save" />
        </form>
      </div>
    </div>
  )
}
