import React from 'react'
import { HiHome, HiCurrencyDollar, HiUserGroup, HiCalendar, HiDocumentText } from 'react-icons/hi'

function PageNav({ currentView, onNavigate }) {
  const pages = [
    { id: 'home', label: 'Home', icon: <HiHome /> },
    { id: 'contributions', label: 'Contributions', icon: <HiCurrencyDollar /> },
    { id: 'roster', label: 'Members', icon: <HiUserGroup /> },
    { id: 'events', label: 'Events', icon: <HiCalendar /> },
    { id: 'documents', label: 'Documents', icon: <HiDocumentText /> },
  ]

  return (
    <nav className="page-nav">
      {pages.map((page) => (
        <button
          key={page.id}
          type="button"
          className={currentView === page.id ? 'page-nav-button active' : 'page-nav-button'}
          onClick={() => onNavigate(page.id)}
          aria-label={page.label}
        >
          <span className="nav-icon" aria-hidden="true">
            {page.icon}
          </span>
          <span className="nav-label">{page.label}</span>
        </button>
      ))}
    </nav>
  )
}

export default PageNav
