import React from 'react'
import { FiHome, FiDollarSign, FiUsers, FiCalendar, FiFileText } from 'react-icons/fi'

function PageNav({ currentView, onNavigate }) {
  const pages = [
    { id: 'home', label: 'Home', icon: <FiHome /> },
    { id: 'contributions', label: 'Contributions', icon: <FiDollarSign /> },
    { id: 'roster', label: 'Members', icon: <FiUsers /> },
    { id: 'events', label: 'Events', icon: <FiCalendar /> },
    { id: 'documents', label: 'Documents', icon: <FiFileText /> },
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
