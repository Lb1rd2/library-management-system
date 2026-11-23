import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useReadingList } from '../context/ReadingListContext'

function Navbar() {
  const { readingList } = useReadingList()
  const navigate = useNavigate()
  useLocation() // makes the navbar refresh whenever the page changes
  const token = localStorage.getItem('token')

  function logout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="bg-indigo-700 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3">
        <Link to="/" className="text-lg font-bold">
          Library
        </Link>
        <Link to="/reading-list" className="hover:underline">
          Reading List ({readingList.length})
        </Link>
        <Link to="/book-space" className="hover:underline">
          Book a Space
        </Link>
        <div className="ml-auto flex gap-4">
          {token ? (
            <button onClick={logout} className="hover:underline">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar