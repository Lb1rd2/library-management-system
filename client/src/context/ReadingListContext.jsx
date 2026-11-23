import { createContext, useContext, useEffect, useReducer } from 'react'

const ReadingListContext = createContext(null)
const STORAGE_KEY = 'readingList'

function readingListReducer(state, action) {
  switch (action.type) {
    case 'ADD_BOOK':
      if (state.some((book) => book.id === action.payload.id)) return state
      return [...state, action.payload]
    case 'REMOVE_BOOK':
      return state.filter((book) => book.id !== action.payload)
    case 'CLEAR_LIST':
      return []
    default:
      return state
  }
}

function loadList() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function ReadingListProvider({ children }) {
  const [readingList, dispatch] = useReducer(readingListReducer, [], loadList)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readingList))
  }, [readingList])

  return (
    <ReadingListContext.Provider value={{ readingList, dispatch }}>
      {children}
    </ReadingListContext.Provider>
  )
}

export function useReadingList() {
  const context = useContext(ReadingListContext)
  if (!context) {
    throw new Error('useReadingList must be used inside ReadingListProvider')
  }
  return context
}