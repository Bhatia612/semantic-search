import { useSearch } from '../hooks/useSearch'
import '../styles/search.scss'

function SearchPage() {
  const { results, loading, query, setQuery, handleSearch } = useSearch()

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div>
      <div className="search__bar">
        <input
          className="search__input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search by meaning... e.g. 'what are the risks?'"
        />
        <button className="search__button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading && <p className="search__empty">Searching...</p>}

      {!loading && results.length === 0 && query && (
        <p className="search__empty">No results found</p>
      )}

      <div className="search__results">
        {results.map((result) => (
          <div key={result.id} className="search__card">
            <div className="search__card-header">
              <span className="search__source">{result.source}</span>
              <span className="search__similarity">
                {Math.round(result.similarity * 100)}% match
              </span>
            </div>
            <p className="search__text">{result.text}</p>
            <p className="search__chunk">Chunk {result.chunk_index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchPage