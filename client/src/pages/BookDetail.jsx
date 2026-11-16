import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')

    axios
      .get(`${import.meta.env.VITE_API_URL}/books/${id}`)
      .then((res) => setBook(res.data))
      .catch(() => setError('Could not find this book.'))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Link to="/" className="text-indigo-600 hover:underline">
        &larr; Back to catalog
      </Link>

      {loading && <p className="py-10 text-center text-gray-500">Loading book...</p>}
      {error && <p className="py-10 text-center text-red-600">{error}</p>}

      {book && (
        <div className="mt-4 rounded-lg bg-white p-6 shadow">
          <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
            {book.genre?.name}
          </span>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">{book.title}</h1>
          <p className="mt-1 text-lg text-gray-600">by {book.author}</p>

          <dl className="mt-6 space-y-2 text-gray-700">
            <div><dt className="inline font-semibold">ISBN: </dt><dd className="inline">{book.isbn}</dd></div>
            {book.publishedYear && (
              <div><dt className="inline font-semibold">Published: </dt><dd className="inline">{book.publishedYear}</dd></div>
            )}
            <div>
              <dt className="inline font-semibold">Copies available: </dt>
              <dd className="inline">{book.availableCopies} of {book.totalCopies}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  )
}

export default BookDetail