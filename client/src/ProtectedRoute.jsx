import { Navigate, Outlet } from "react-router-dom"

import { useAuth } from "./context/AuthContex"

export default function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth()

  if (loading) return <h1>Loading...</h1>

  return !isAuthenticated && !loading
    ? <Navigate to='/login' replace />
    : <Outlet />
}
