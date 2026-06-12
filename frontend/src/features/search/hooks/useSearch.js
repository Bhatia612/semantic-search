import { useState } from 'react'
import { searchDocuments } from '../services/search.api'

export function useSearch() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  async function handleSearch() {
    if (!query.trim()) return

    setLoading(true)
    setResults([])

    try {
      const data = await searchDocuments(query)
      setResults(data)
    } catch (err) {
      console.error('Search failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return { results, loading, query, setQuery, handleSearch }
}