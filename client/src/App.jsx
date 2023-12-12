import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<h1>Home page</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/task" element={<h1>Tasks page</h1>} />
        <Route path="/add-task" element={<h1>New task</h1>} />
        <Route path="/tasks/:id" element={<h1>Update task</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
     </Routes>
    </BrowserRouter>
  )
}

export default App