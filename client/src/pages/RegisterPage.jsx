import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { Input } from '../components/Input'
import { useAuth } from '../context/AuthContex'
import { Button } from '../components/Button'

export default function RegisterPage() {
  const { signUp, isAuthenticated, errors: registerErrors } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => await signUp(values))

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {
          registerErrors.map((e, i) => (
            <div key={e} className="bg-red-500 p-2 mb-2">{e}</div>
          ))
        }
        <h1 className="text-2xl font-bold">Register</h1>
        <form onSubmit={onSubmit}>
          <Input type="text" placeholder="Username" {...register('username', { required: true })} />
          {errors.username && (<p className="text-red-500">Username is required</p>)}
          <Input type="email" placeholder="Email" {...register('email', { required: true })} />
          {errors.email && (<p className="text-red-500">Email is required</p>)}
          <Input type="password" placeholder="Password" {...register('password', { required: true })} />
          {errors.password && (<p className="text-red-500">Password is required</p>)}
          <Button value="Sign up" />        </form>
        <p className="flex gap-x-2 justify-between mt-2">
          Have you already got an account?
          <Link to="/login" className="text-sky-500">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
