import { useEffect } from "react"
import { useForm } from "react-hook-form"
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useTasks } from "../context/TaskContext"
import { useNavigate, useParams } from "react-router-dom"

dayjs.extend(utc)

export default function TaskFormPage() {
  const { createTask, getTask, editTask } = useTasks()
  const { register, handleSubmit, setValue } = useForm()

  const navigate = useNavigate()
  const params = useParams()
  const isEdit = Boolean(params.id)

  useEffect(() => {
    const loadTask = async () => {
      if (isEdit) {
        const task = await getTask(params.id)
        setValue('title', task.title)
        setValue('description', task.description)
        setValue('date', dayjs.utc(task.date).format('YYYY-MM-DD'))
      }
    }

    loadTask()
  }, [])

  const onSubmit = handleSubmit(data => {
    const dataWithDate = {
      ...data,
      date: dayjs.utc(data.date || new Date()).format()
    } 

    if (params.id) {
      editTask(params.id, dataWithDate)
    } else {
      createTask(dataWithDate)
    }

    navigate('/tasks')
  })

  // TODO: textarea class ==  input class
  // TODO: form wrapper to components
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="max-w-md w-full p-8 rounded-sm border">
        <form onSubmit={e => onSubmit(e)}>
          <h1 className="text-2xl font-bold mb-4">{`${isEdit ? 'Edit' : 'New'} task`}</h1>
          <Input
            type="text"
            placeholder="Title"
            {...register("title")}
          />
          
          <textarea
            rows="3"
            placeholder="Description"
            className="w-full text-white px-4 py-2 rounded-sm my-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            {...register("description")}></textarea>
            
          <Input
            type="date"
            placeholder="Date"
            {...register("date")}
          />
          <Button value="Save" className="mt-6"/>
        </form>
      </div>
    </div>
  )
}
