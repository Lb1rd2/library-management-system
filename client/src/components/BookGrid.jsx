import { useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from './BookCard'

function BookGrid({ genreId, search }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')

    const params = { limit: 50 }
    if (genreId) params.genreId = genreId
    if (search) params.search = search

    axios
      .get(`${import.meta.env.VITE_API_URL}/books`, { params })
      .then((res) => setBooks(res.data.data))
      .catch(() => setError('Could not load books. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [genreId, search])

  if (loading) return <p className="py-10 text-center text-gray-500">Loading books...</p>
  if (error) return <p className="py-10 text-center text-red-600">{error}</p>
  if (books.length === 0)
    return <p className="py-10 text-center text-gray-500">No books found.</p>

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}

export default BookGrid