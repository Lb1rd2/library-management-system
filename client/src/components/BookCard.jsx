import { Link } from 'react-router-dom'

function BookCard({ book }) {
  return (
    <Link
      to={`/books/${book.id}`}
      className="block rounded-lg bg-white p-4 shadow transition hover:shadow-lg"
    >
      <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
        {book.genre?.name}
      </span>
      <h3 className="mt-3 text-lg font-semibold text-gray-900">{book.title}</h3>
      <p className="text-sm text-gray-600">by {book.author}</p>
      <p className="mt-3 text-sm text-gray-500">
        {book.availableCopies} of {book.totalCopies} copies available
      </p>
    </Link>
  )
}

export default BookCard