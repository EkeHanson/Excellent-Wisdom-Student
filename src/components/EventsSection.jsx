import React, { useState, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarDays,
  faClock,
  faLocationDot,
  faChevronLeft,
  faChevronRight,
  faUsers,
  faGavel,
  faListCheck,
  faBookOpen,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons'

const EVENTS_PER_PAGE = 5
const MINUTES_PER_PAGE = 3

/* ─── Shared subcomponents ─────────────────────────────────────── */

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <header className="ev-section-header">
      {eyebrow && <span className="ev-eyebrow">{eyebrow}</span>}
      <h2 className="ev-section-title">{title}</h2>
      {subtitle && <p className="ev-section-subtitle">{subtitle}</p>}
    </header>
  )
}

function DateBadge({ date, variant = 'event' }) {
  const d = new Date(date)
  return (
    <div className={`ev-date-badge ev-date-badge--${variant}`} aria-hidden="true">
      <span className="ev-date-day">{d.getDate()}</span>
      <span className="ev-date-month">
        {d.toLocaleDateString('en-US', { month: 'short' })}
      </span>
    </div>
  )
}

function Pagination({ page, total, onPrev, onNext, label }) {
  if (total <= 1) return null
  return (
    <nav className="ev-pagination" aria-label={`${label} pagination`}>
      <button
        type="button"
        className="ev-page-control"
        onClick={onPrev}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
        <span>Previous</span>
      </button>
      <span className="ev-pagination-status" aria-live="polite">
        Page <strong>{page}</strong> of {total}
      </span>
      <button
        type="button"
        className="ev-page-control"
        onClick={onNext}
        disabled={page === total}
        aria-label="Next page"
      >
        <span>Next</span>
        <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
      </button>
    </nav>
  )
}

function EmptyState({ message }) {
  return (
    <div className="ev-empty">
      <FontAwesomeIcon icon={faCircleInfo} aria-hidden="true" />
      <p>{message}</p>
    </div>
  )
}

/* ─── Event card ───────────────────────────────────────────────── */

function EventCard({ event, formatDate }) {
  return (
    <article className="ev-event-card">
      <DateBadge date={event.date} variant="event" />

      <div className="ev-event-body">
        <div className="ev-event-top">
          <h3 className="ev-event-title">{event.title}</h3>
          {event.isUpcoming && (
            <span className="ev-badge ev-badge--upcoming">
              <FontAwesomeIcon icon={faCalendarDays} aria-hidden="true" />
              Upcoming
            </span>
          )}
        </div>

        <div className="ev-event-meta">
          <span className="ev-meta-item">
            <FontAwesomeIcon icon={faCalendarDays} aria-hidden="true" />
            {formatDate(event.date)}
          </span>
          {event.time && (
            <span className="ev-meta-item">
              <FontAwesomeIcon icon={faClock} aria-hidden="true" />
              {event.time}
            </span>
          )}
          {event.location && (
            <span className="ev-meta-item">
              <FontAwesomeIcon icon={faLocationDot} aria-hidden="true" />
              {event.location}
            </span>
          )}
        </div>

        {event.description && (
          <p className="ev-event-description">{event.description}</p>
        )}
      </div>
    </article>
  )
}

/* ─── Minutes card ─────────────────────────────────────────────── */

function MinutesCard({ minute, formatDate }) {
  return (
    <article className="ev-minute-card">
      <header className="ev-minute-header">
        <DateBadge date={minute.date} variant="minute" />
        <div className="ev-minute-heading">
          <h3 className="ev-minute-title">{minute.title}</h3>
          <p className="ev-minute-date">{formatDate(minute.date)}</p>
        </div>
        <FontAwesomeIcon
          icon={faBookOpen}
          className="ev-minute-icon"
          aria-hidden="true"
        />
      </header>

      {minute.summary && (
        <section className="ev-minute-block">
          <h4>
            <FontAwesomeIcon icon={faCircleInfo} aria-hidden="true" />
            Summary
          </h4>
          <p>{minute.summary}</p>
        </section>
      )}

      {minute.attendees && (
        <section className="ev-minute-block">
          <h4>
            <FontAwesomeIcon icon={faUsers} aria-hidden="true" />
            Attendees
          </h4>
          <p>{minute.attendees}</p>
        </section>
      )}

      {minute.decisions?.length > 0 && (
        <section className="ev-minute-block">
          <h4>
            <FontAwesomeIcon icon={faGavel} aria-hidden="true" />
            Key Decisions
          </h4>
          <ul className="ev-minute-list">
            {minute.decisions.map((decision, index) => (
              <li key={index}>{decision}</li>
            ))}
          </ul>
        </section>
      )}

      {minute.actionItems?.length > 0 && (
        <section className="ev-minute-block">
          <h4>
            <FontAwesomeIcon icon={faListCheck} aria-hidden="true" />
            Action Items
          </h4>
          <ul className="ev-minute-list ev-minute-list--actions">
            {minute.actionItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}

/* ─── Main component ───────────────────────────────────────────── */

function EventsSection({ events, meetingMinutes }) {
  const [eventsPage, setEventsPage] = useState(1)
  const [minutesPage, setMinutesPage] = useState(1)
  const [activeTab, setActiveTab] = useState('events')

  const totalEventPages = Math.max(1, Math.ceil(events.length / EVENTS_PER_PAGE))
  const paginatedEvents = useMemo(() => {
    const startIndex = (eventsPage - 1) * EVENTS_PER_PAGE
    return events.slice(startIndex, startIndex + EVENTS_PER_PAGE)
  }, [events, eventsPage])

  const totalMinutesPages = Math.max(1, Math.ceil(meetingMinutes.length / MINUTES_PER_PAGE))
  const paginatedMinutes = useMemo(() => {
    const startIndex = (minutesPage - 1) * MINUTES_PER_PAGE
    return meetingMinutes.slice(startIndex, startIndex + MINUTES_PER_PAGE)
  }, [meetingMinutes, minutesPage])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <section className="ev-section" aria-labelledby="events-heading">
      {/* Scoped styles co-located in this component */}
      <style>{EVENTS_CSS}</style>

      <SectionHeader
        eyebrow="Stay in the loop"
        title="Events & Meetings"
        subtitle="Stay updated with upcoming events and past meeting minutes."
      />

      <div className="ev-tabs" role="tablist" aria-label="Events and minutes">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'events'}
          className={`ev-tab ${activeTab === 'events' ? 'ev-tab--active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          <FontAwesomeIcon icon={faCalendarDays} aria-hidden="true" />
          Upcoming Events
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'minutes'}
          className={`ev-tab ${activeTab === 'minutes' ? 'ev-tab--active' : ''}`}
          onClick={() => setActiveTab('minutes')}
        >
          <FontAwesomeIcon icon={faBookOpen} aria-hidden="true" />
          Meeting Minutes
        </button>
      </div>

      {activeTab === 'events' && (
        <div className="ev-content">
          {paginatedEvents.length === 0 ? (
            <EmptyState message="No upcoming events scheduled." />
          ) : (
            <div className="ev-list">
              {paginatedEvents.map((event) => (
                <EventCard key={event.id} event={event} formatDate={formatDate} />
              ))}
            </div>
          )}

          <Pagination
            page={eventsPage}
            total={totalEventPages}
            onPrev={() => setEventsPage((p) => Math.max(1, p - 1))}
            onNext={() => setEventsPage((p) => Math.min(totalEventPages, p + 1))}
            label="Events"
          />
        </div>
      )}

      {activeTab === 'minutes' && (
        <div className="ev-content">
          {paginatedMinutes.length === 0 ? (
            <EmptyState message="No meeting minutes available." />
          ) : (
            <div className="ev-list">
              {paginatedMinutes.map((minute) => (
                <MinutesCard key={minute.id} minute={minute} formatDate={formatDate} />
              ))}
            </div>
          )}

          <Pagination
            page={minutesPage}
            total={totalMinutesPages}
            onPrev={() => setMinutesPage((p) => Math.max(1, p - 1))}
            onNext={() => setMinutesPage((p) => Math.min(totalMinutesPages, p + 1))}
            label="Minutes"
          />
        </div>
      )}
    </section>
  )
}

/* ─── Scoped styles ────────────────────────────────────────────── */

const EVENTS_CSS = `
.ev-section {
  --ev-primary: #1d4ed8;
  --ev-primary-dark: #1e3a8a;
  --ev-primary-soft: #dbeafe;
  --ev-accent: #f59e0b;
  --ev-accent-soft: #fef3c7;
  --ev-text: #0f172a;
  --ev-text-muted: #64748b;
  --ev-surface: #ffffff;
  --ev-bg-soft: #f6f8fb;
  --ev-border: #e3e8ef;
  --ev-radius-sm: 8px;
  --ev-radius-md: 14px;
  --ev-radius-lg: 20px;
  --ev-shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.06);
  --ev-shadow-md: 0 4px 16px rgba(15, 23, 42, 0.08);
  --ev-shadow-lg: 0 12px 40px rgba(15, 23, 42, 0.12);

  max-width: 1120px;
  margin: 0 auto;
  padding: 4.5rem 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--ev-text);
  line-height: 1.65;
}

/* Section header */
.ev-section-header { margin-bottom: 2rem; max-width: 640px; }
.ev-eyebrow {
  display: inline-block;
  font-size: 0.75rem; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--ev-primary);
  background: var(--ev-primary-soft);
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  margin-bottom: 0.9rem;
}
.ev-section-title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700; letter-spacing: -0.015em;
  margin: 0 0 0.4rem; line-height: 1.2;
  color: var(--ev-text);
}
.ev-section-subtitle {
  font-size: 1rem; color: var(--ev-text-muted); margin: 0;
}

/* Tabs */
.ev-tabs {
  display: inline-flex;
  gap: 0.35rem;
  padding: 0.35rem;
  background: var(--ev-bg-soft);
  border: 1px solid var(--ev-border);
  border-radius: 999px;
  margin-bottom: 2rem;
}
.ev-tab {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.15rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ev-text-muted);
  background: transparent;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
}
.ev-tab:hover { color: var(--ev-primary); }
.ev-tab--active {
  background: var(--ev-surface);
  color: var(--ev-primary);
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
}
.ev-tab:focus-visible {
  outline: 2px solid var(--ev-primary);
  outline-offset: 2px;
}

/* Content */
.ev-content { display: flex; flex-direction: column; gap: 1.25rem; }
.ev-list { display: flex; flex-direction: column; gap: 1rem; }

/* Event card */
.ev-event-card {
  display: flex;
  gap: 1.25rem;
  padding: 1.25rem 1.4rem;
  background: var(--ev-surface);
  border: 1px solid var(--ev-border);
  border-radius: var(--ev-radius-lg);
  box-shadow: var(--ev-shadow-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.ev-event-card:hover {
  transform: translateY(-2px);
  border-color: var(--ev-primary);
  box-shadow: var(--ev-shadow-md);
}
.ev-event-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.6rem; }
.ev-event-top {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 1rem; flex-wrap: wrap;
}
.ev-event-title {
  font-size: 1.1rem; font-weight: 700;
  color: var(--ev-text); margin: 0; line-height: 1.3;
}
.ev-event-meta {
  display: flex; flex-wrap: wrap; gap: 0.4rem 1rem;
  font-size: 0.85rem; color: var(--ev-text-muted);
}
.ev-meta-item {
  display: inline-flex; align-items: center; gap: 0.4rem;
}
.ev-meta-item svg {
  color: var(--ev-primary);
  font-size: 0.8rem;
  opacity: 0.75;
}
.ev-event-description {
  font-size: 0.93rem; color: var(--ev-text-muted);
  margin: 0; line-height: 1.6;
}

/* Date badge */
.ev-date-badge {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; flex-shrink: 0;
  width: 64px; height: 64px;
  border-radius: var(--ev-radius-md);
  color: #ffffff; text-align: center; line-height: 1.05;
  overflow: hidden;
}
.ev-date-badge--event {
  background: linear-gradient(135deg, var(--ev-primary), var(--ev-primary-dark));
  box-shadow: 0 6px 14px rgba(29, 78, 216, 0.3);
}
.ev-date-badge--minute {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  box-shadow: 0 6px 14px rgba(245, 158, 11, 0.3);
}
.ev-date-day { font-size: 1.4rem; font-weight: 800; line-height: 1; margin-top: 0.2rem; }
.ev-date-month {
  font-size: 0.68rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  opacity: 0.92; margin-bottom: 0.2rem;
}

/* Badge */
.ev-badge {
  display: inline-flex; align-items: center; gap: 0.35rem;
  padding: 0.3rem 0.7rem; border-radius: 999px;
  font-size: 0.72rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.05em;
}
.ev-badge--upcoming {
  color: #b45309; background: var(--ev-accent-soft);
  border: 1px solid #fcd34d;
}

/* Minutes card */
.ev-minute-card {
  padding: 1.5rem;
  background: var(--ev-surface);
  border: 1px solid var(--ev-border);
  border-radius: var(--ev-radius-lg);
  box-shadow: var(--ev-shadow-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.ev-minute-card:hover {
  transform: translateY(-2px);
  border-color: var(--ev-accent);
  box-shadow: var(--ev-shadow-md);
}
.ev-minute-header {
  display: flex; align-items: center; gap: 1rem;
  padding-bottom: 1rem; margin-bottom: 1.25rem;
  border-bottom: 1px solid var(--ev-border);
  position: relative;
}
.ev-minute-heading { flex: 1; min-width: 0; }
.ev-minute-title {
  font-size: 1.1rem; font-weight: 700;
  color: var(--ev-text); margin: 0 0 0.2rem; line-height: 1.3;
}
.ev-minute-date { font-size: 0.85rem; color: var(--ev-text-muted); margin: 0; }
.ev-minute-icon {
  font-size: 2rem; color: var(--ev-primary);
  opacity: 0.12; position: absolute;
  right: 0; top: 50%; transform: translateY(-50%);
  pointer-events: none;
}

/* Minute blocks */
.ev-minute-block { margin-bottom: 1.25rem; }
.ev-minute-block:last-child { margin-bottom: 0; }
.ev-minute-block h4 {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: 0.78rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--ev-primary);
  margin: 0 0 0.5rem;
}
.ev-minute-block h4 svg { font-size: 0.8rem; opacity: 0.8; }
.ev-minute-block p {
  font-size: 0.93rem; color: var(--ev-text);
  margin: 0; line-height: 1.6;
}
.ev-minute-list {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 0.4rem;
}
.ev-minute-list li {
  position: relative;
  padding: 0.6rem 0.85rem 0.6rem 1.9rem;
  font-size: 0.9rem; color: var(--ev-text);
  background: var(--ev-bg-soft);
  border-radius: var(--ev-radius-sm);
}
.ev-minute-list li::before {
  content: '';
  position: absolute;
  left: 0.75rem; top: 50%;
  transform: translateY(-50%);
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--ev-primary);
}
.ev-minute-list--actions li::before {
  background: var(--ev-accent);
  width: 8px; height: 8px;
  border-radius: 2px;
}

/* Empty state */
.ev-empty {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 0.75rem;
  padding: 3rem 1.5rem;
  background: var(--ev-bg-soft);
  border: 1px dashed var(--ev-border);
  border-radius: var(--ev-radius-lg);
  color: var(--ev-text-muted);
  text-align: center;
}
.ev-empty svg { font-size: 1.75rem; color: var(--ev-primary); opacity: 0.5; }
.ev-empty p { margin: 0; font-size: 0.95rem; }

/* Pagination */
.ev-pagination {
  display: flex; align-items: center; justify-content: center;
  gap: 1rem; padding-top: 0.5rem;
}
.ev-page-control {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.6rem 1.1rem;
  font-size: 0.88rem; font-weight: 600;
  color: var(--ev-primary); background: var(--ev-surface);
  border: 1px solid var(--ev-border);
  border-radius: var(--ev-radius-sm);
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
.ev-page-control:hover:not(:disabled) {
  background: var(--ev-primary);
  border-color: var(--ev-primary);
  color: #ffffff;
}
.ev-page-control:focus-visible {
  outline: 2px solid var(--ev-primary); outline-offset: 2px;
}
.ev-page-control:disabled { opacity: 0.4; cursor: not-allowed; }
.ev-pagination-status { font-size: 0.9rem; color: var(--ev-text-muted); }
.ev-pagination-status strong { color: var(--ev-text); }

/* Responsive */
@media (max-width: 640px) {
  .ev-section { padding: 3rem 1.25rem; }
  .ev-tabs { width: 100%; overflow-x: auto; }
  .ev-tab { flex: 1; justify-content: center; white-space: nowrap; }
  .ev-event-card { flex-direction: column; gap: 1rem; }
  .ev-minute-header { flex-wrap: wrap; }
  .ev-minute-icon { display: none; }
  .ev-pagination { flex-wrap: wrap; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .ev-event-card, .ev-minute-card, .ev-tab, .ev-page-control {
    transition: none !important;
  }
  .ev-event-card:hover, .ev-minute-card:hover { transform: none; }
}
`

export default EventsSection