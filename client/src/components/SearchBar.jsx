import { useEffect, useState } from 'react'

function SearchBar({ onSearch }) {
  const [text, setText] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(text)
    }, 500)

    return () => clearTimeout(timer)
  }, [text])

  return (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Search by title or author..."
      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none"
    />
  )
}

export default SearchBar