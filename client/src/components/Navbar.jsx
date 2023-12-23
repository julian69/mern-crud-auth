import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContex";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth()

  return (
    <nav className="bg-zinc-700 mb-3 py-5 px-10">
      <div className="container mx-auto flex justify-between">
        <Link to="/">
          <h1 className="text-2xl font-bold">Tasks Manager</h1>
        </Link>
        <ul className="flex gap-x-2">
          {
            isAuthenticated ? (
              <>
                <li>
                  Welcome {user.username}
                </li>
                <li>
                  <Link to="/add-task" className="bg-indigo-500 px-4 py-1 rounded-sm">Create task</Link>
                </li>
                <li>
                  <Link to="/" onClick={logout}>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="bg-indigo-500 px-4 py-1 rounded-sm">Register</Link>
                </li>
              </>
            )
          }
        </ul >
      </div>
    </nav >
  )
}
