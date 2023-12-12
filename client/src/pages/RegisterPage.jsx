import { useForm } from 'react-hook-form'
import { Input } from '../components/Input/Input'
import { registerRequest } from '../api/auth'

export default function RegisterPage() {
  const { register, handleSubmit } = useForm()

  const onSubmit = handleSubmit(async (values) => await registerRequest(values))

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <Input type="text" placeholder="Username" {...register('username', { required: true })} />
        <Input type="email" placeholder="Email" {...register('email', { required: true })} />
        <Input type="password" placeholder="Password" {...register('password', { required: true })} />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register</button>
      </form>
    </div>
  )
}
