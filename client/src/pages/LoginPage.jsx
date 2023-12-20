import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

import { useAuth } from "../context/AuthContex"
import { Input } from "../components/Input"
import { Button } from "../components/Button"


export default function LoginPage() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signIn, errors: signInErrors, isAuthenticated } = useAuth()

  const onSubmit = handleSubmit(async (values) => await signIn(values))

    useEffect(() => {
      if (isAuthenticated) navigate('/tasks')
    }, [isAuthenticated])

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {
          signInErrors.map((e, i) => (
            <div key={`${i}-${e}`} className="bg-red-500 p-2 mb-2">{e}</div>
          ))
        }
        <form onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold">Login</h1>
          <Input type="email" placeholder="Email" {...register('email', { required: true })} />
          {errors.email && (<p className="text-red-500">Email is required</p>)}
          <Input type="password" placeholder="Password" {...register('password', { required: true })} />
          {errors.password && (<p className="text-red-500">Password is required</p>)}
          <Button value="Login" />        </form>
        <p className="flex gap-x-2 justify-between mt-2">
          Don't have an account?
          <Link to="/register" className="text-sky-500">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
