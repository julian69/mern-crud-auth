import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input } from '../components/Input/Input'
import { useAuth } from '../context/AuthContex'


export default function RegisterPage() {
  const { signUp, isAuthenticated, errors: registerErrors } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/task')
    }
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => await signUp(values))

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      {
        registerErrors.map((e, i) => (
          <div key={`${i}-${e}`} className="bg-red-500 p-2">{e}</div>
        ))
      }
      <form onSubmit={onSubmit}>
        <Input type="text" placeholder="Username" {...register('username', { required: true })} />
        {errors.username && (<p className="text-red-500">Username is required</p>)}
        <Input type="email" placeholder="Email" {...register('email', { required: true })} />
        {errors.email && (<p className="text-red-500">Email is required</p>)}
        <Input type="password" placeholder="Password" {...register('password', { required: true })} />
        {errors.password && (<p className="text-red-500">Password is required</p>)}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Register</button>
      </form>
    </div>
  )
}
