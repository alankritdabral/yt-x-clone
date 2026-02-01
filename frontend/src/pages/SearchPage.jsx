import { useState, useEffect } from 'react'
import VideoCard from '../components/VideoCard'

// TODO: Implement search query from URL params
// TODO: Add filters (date, duration, upload date, etc.)
// TODO: Add sort options
// TODO: Implement pagination
// TODO: Add search suggestions/autocomplete

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    // TODO: Fetch search results from /api/search?q=query
    const performSearch = async () => {
      if (!searchQuery) return
      try {
        setLoading(true)
        const response = await fetch(`/api/search?q=${searchQuery}&type=${filterType}`)
        const data = await response.json()
        setResults(data.data)
      } catch (error) {
        console.error('Error searching:', error)
      } finally {
        setLoading(false)
      }
    }
    performSearch()
  }, [searchQuery, filterType])

  return (
    <div className="search-page">
      <div className="search-filters">
        <input
          type="text"
          className="search-input"
          placeholder="Search videos, users, tweets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All</option>
          <option value="video">Videos</option>
          <option value="user">Users</option>
          <option value="tweet">Tweets</option>
          <option value="playlist">Playlists</option>
        </select>
      </div>

      <div className="search-results">
        {loading ? (
          <p>Searching...</p>
        ) : results.length > 0 ? (
          <div className="results-grid">
            {results.map((result) => (
              <VideoCard key={result._id} video={result} />
            ))}
          </div>
        ) : searchQuery ? (
          <p>No results found for "{searchQuery}"</p>
        ) : (
          <p>Start typing to search</p>
        )}
      </div>
    </div>
  )
}

export default SearchPage
