import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import BookGrid from '../components/BookGrid'

function HomePage() {
  const [genres, setGenres] = useState([])
  const [genreId, setGenreId] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/genres`)
      .then((res) => setGenres(res.data))
      .catch(() => setGenres([]))
  }, [])

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Library Catalog</h1>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <SearchBar onSearch={setSearch} />
        </div>
        <select
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2"
        >
          <option value="">All genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      <BookGrid genreId={genreId} search={search} />
    </div>
  )
}

export default HomePage