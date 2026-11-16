import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BookDetail from './pages/BookDetail'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<BookDetail />} />
      </Routes>
    </div>
  )
}

export default App