import { Link } from 'react-router-dom'
import { useReadingList } from '../context/ReadingListContext'

function BookCard({ book }) {
  const { readingList, dispatch } = useReadingList()
  const inList = readingList.some((item) => item.id === book.id)

  function toggleBook() {
    if (inList) {
      dispatch({ type: 'REMOVE_BOOK', payload: book.id })
    } else {
      dispatch({
        type: 'ADD_BOOK',
        payload: { id: book.id, title: book.title, author: book.author },
      })
    }
  }

  return (
    <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md">
      <Link to={`/books/${book.id}`} className="block">
        <h2 className="text-lg font-semibold text-gray-900">{book.title}</h2>
        <p className="text-sm text-gray-600">{book.author}</p>
        {book.genre && (
          <span className="mt-2 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs text-indigo-700">
            {book.genre.name}
          </span>
        )}
      </Link>

      <button
        onClick={toggleBook}
        className={`mt-4 rounded-lg px-3 py-2 text-sm font-medium ${
          inList
            ? 'border border-gray-300 text-gray-700 hover:bg-gray-100'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        {inList ? 'Remove from reading list' : 'Add to reading list'}
      </button>
    </div>
  )
}

export default BookCard