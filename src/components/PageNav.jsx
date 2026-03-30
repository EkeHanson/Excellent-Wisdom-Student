import React from 'react'

function PageNav({ currentView, onNavigate }) {
  const pages = [
    { id: 'home', label: 'Home' },
    { id: 'contributions', label: 'Contributions' },
    { id: 'roster', label: 'Members' },
    { id: 'documents', label: 'Documents' },
  ]

  return (
    <nav className="page-nav">
      {pages.map((page) => (
        <button
          key={page.id}
          type="button"
          className={currentView === page.id ? 'page-nav-button active' : 'page-nav-button'}
          onClick={() => onNavigate(page.id)}
        >
          {page.label}
        </button>
      ))}
    </nav>
  )
}

export default PageNav
