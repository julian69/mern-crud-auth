import { Link } from "react-router-dom"

import { useAuth } from "../context/AuthContex"
import logUrl from '../assets/logo.svg'

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth()

  return (
    <nav className="bg-white mb-3 py-2 shadow-md">
      <div className="container mx-auto flex justify-between">
        <Link to="/">
          <h1 className="text-2xl font-bold text-indigo-600 flex items-center">
            <img src={logUrl} alt="hero" width="50" />
            Tasky
          </h1>
        </Link>
        <ul className="flex gap-x-2 items-center">
          {
            isAuthenticated ? (
              <>
                <li>
                  Welcome <span className="font-bold text">{user.username}</span>
                </li>
                <li>
                  <Link to="/add-task" className="bg-indigo-500 text-white px-4 py-2 rounded-sm">Create task</Link>
                </li>
                <li>
                  <Link to="/" onClick={logout}>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="bg-indigo-500 text-white px-4 py-2 rounded-sm">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="bg-indigo-500 text-white px-4 py-2 rounded-sm">Register</Link>
                </li>
              </>
            )
          }
        </ul >
      </div>
    </nav >
  )
}
