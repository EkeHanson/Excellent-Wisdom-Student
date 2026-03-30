import React, { useMemo, useState } from 'react'

const ITEMS_PER_PAGE = 20

function RosterSection({
  classmates,
  searchTerm,
  onSearchTermChange,
  onViewProfile,
  lateMembersSet,
}) {
  const [currentPage, setCurrentPage] = useState(1)

  // Filter classmates based on search term (searches across all pages)
  const filteredClassmates = useMemo(() => {
    if (!searchTerm.trim()) return classmates
    const lowerSearch = searchTerm.toLowerCase()
    return classmates.filter((name) => name.toLowerCase().includes(lowerSearch))
  }, [classmates, searchTerm])

  const totalResults = filteredClassmates.length
  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE)

  // Paginate the filtered results
  const paginatedClassmates = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredClassmates.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredClassmates, currentPage])

  // Reset to page 1 when search term changes
  const handleSearchChange = (event) => {
    onSearchTermChange(event.target.value)
    setCurrentPage(1)
  }

  return (
    <section className="section roster">
      <div className="section-header roster-header">
        <div>
          <h2>Classmate Roster</h2>
          <p>Search the names list and open any classmate profile.</p>
        </div>
        <div className="roster-summary">
          <strong>{totalResults}</strong> {totalResults === 1 ? 'result' : 'results'}
        </div>
      </div>

      <div className="roster-controls">
        <label className="roster-search-label" htmlFor="roster-search">
          Search names
        </label>
        <input
          id="roster-search"
          type="search"
          className="roster-search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Start typing a classmate name"
        />
      </div>

      <div className="roster-group">
        <div className="roster-group-header">
          <h3>Classmates</h3>
          <span className="roster-badge">{totalResults}</span>
        </div>
        <div className="roster-grid">
          {paginatedClassmates.map((classmate) => (
            <button
              key={classmate}
              type="button"
              className="roster-item"
              onClick={() => onViewProfile(classmate)}
            >
              {classmate}
              {lateMembersSet.has(classmate) && (
                <span className="late-badge">Late</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {totalResults === 0 && (
        <p className="no-results">No classmates match your search.</p>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            type="button"
            className="page-control"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            className="page-control"
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </section>
  )
}

export default RosterSection
