import { Link } from 'react-router-dom'
import { useReadingList } from '../context/ReadingListContext'

function ReadingListPage() {
  const { readingList, dispatch } = useReadingList()

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Reading List</h1>
        {readingList.length > 0 && (
          <button
            onClick={() => dispatch({ type: 'CLEAR_LIST' })}
            className="rounded-lg border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
          >
            Clear list
          </button>
        )}
      </div>

      {readingList.length === 0 ? (
        <p className="text-gray-600">
          Your reading list is empty. Go to the{' '}
          <Link to="/" className="text-indigo-600 hover:underline">
            catalog
          </Link>{' '}
          and add some books.
        </p>
      ) : (
        <ul className="space-y-3">
          {readingList.map((book) => (
            <li
              key={book.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
            >
              <div>
                <Link
                  to={`/books/${book.id}`}
                  className="font-semibold text-gray-900 hover:underline"
                >
                  {book.title}
                </Link>
                <p className="text-sm text-gray-600">{book.author}</p>
              </div>
              <button
                onClick={() => dispatch({ type: 'REMOVE_BOOK', payload: book.id })}
                className="text-sm text-red-600 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ReadingListPage