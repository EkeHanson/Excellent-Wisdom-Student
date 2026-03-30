import React, { useState, useMemo } from 'react'

const EVENTS_PER_PAGE = 5
const MINUTES_PER_PAGE = 3

function EventsSection({ events, meetingMinutes }) {
  const [eventsPage, setEventsPage] = useState(1)
  const [minutesPage, setMinutesPage] = useState(1)
  const [activeTab, setActiveTab] = useState('events')

  // Paginate events
  const totalEventPages = Math.ceil(events.length / EVENTS_PER_PAGE)
  const paginatedEvents = useMemo(() => {
    const startIndex = (eventsPage - 1) * EVENTS_PER_PAGE
    return events.slice(startIndex, startIndex + EVENTS_PER_PAGE)
  }, [events, eventsPage])

  // Paginate minutes
  const totalMinutesPages = Math.ceil(meetingMinutes.length / MINUTES_PER_PAGE)
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
    <section className="section events">
      <div className="section-header">
        <h2>Events & Meetings</h2>
        <p>Stay updated with upcoming events and past meeting minutes.</p>
      </div>

      <div className="events-tabs">
        <button
          type="button"
          className={`events-tab ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Upcoming Events
        </button>
        <button
          type="button"
          className={`events-tab ${activeTab === 'minutes' ? 'active' : ''}`}
          onClick={() => setActiveTab('minutes')}
        >
          Meeting Minutes
        </button>
      </div>

      {activeTab === 'events' && (
        <div className="events-content">
          <div className="events-list">
            {paginatedEvents.length === 0 ? (
              <p className="no-events">No upcoming events scheduled.</p>
            ) : (
              paginatedEvents.map((event) => (
                <article key={event.id} className="event-card">
                  <div className="event-header">
                    <div className="event-date-badge">
                      <span className="event-day">
                        {new Date(event.date).getDate()}
                      </span>
                      <span className="event-month">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                    </div>
                    <div className="event-info">
                      <h3 className="event-title">{event.title}</h3>
                      <p className="event-date">{formatDate(event.date)}</p>
                    </div>
                    {event.time && (
                      <div className="event-time">
                        <span className="event-time-icon">🕐</span>
                        <span>{event.time}</span>
                      </div>
                    )}
                  </div>
                  <p className="event-description">{event.description}</p>
                  {event.location && (
                    <div className="event-location">
                      <span className="event-location-icon">📍</span>
                      <span>{event.location}</span>
                    </div>
                  )}
                  {event.isUpcoming && (
                    <span className="event-badge upcoming">Upcoming</span>
                  )}
                </article>
              ))
            )}
          </div>

          {totalEventPages > 1 && (
            <div className="pagination">
              <button
                type="button"
                className="page-control"
                onClick={() => setEventsPage((page) => Math.max(1, page - 1))}
                disabled={eventsPage === 1}
              >
                Previous
              </button>
              <span>
                Page {eventsPage} of {totalEventPages}
              </span>
              <button
                type="button"
                className="page-control"
                onClick={() => setEventsPage((page) => Math.min(totalEventPages, page + 1))}
                disabled={eventsPage === totalEventPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'minutes' && (
        <div className="events-content">
          <div className="minutes-list">
            {paginatedMinutes.length === 0 ? (
              <p className="no-events">No meeting minutes available.</p>
            ) : (
              paginatedMinutes.map((minute) => (
                <article key={minute.id} className="minute-card">
                  <div className="minute-header">
                    <div className="minute-date-badge">
                      <span className="minute-day">
                        {new Date(minute.date).getDate()}
                      </span>
                      <span className="minute-month">
                        {new Date(minute.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                    </div>
                    <div className="minute-info">
                      <h3 className="minute-title">{minute.title}</h3>
                      <p className="minute-date">{formatDate(minute.date)}</p>
                    </div>
                  </div>
                  <div className="minute-summary">
                    <h4>Summary</h4>
                    <p>{minute.summary}</p>
                  </div>
                  {minute.attendees && (
                    <div className="minute-attendees">
                      <h4>Attendees</h4>
                      <p>{minute.attendees}</p>
                    </div>
                  )}
                  {minute.decisions && minute.decisions.length > 0 && (
                    <div className="minute-decisions">
                      <h4>Key Decisions</h4>
                      <ul>
                        {minute.decisions.map((decision, index) => (
                          <li key={index}>{decision}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {minute.actionItems && minute.actionItems.length > 0 && (
                    <div className="minute-actions">
                      <h4>Action Items</h4>
                      <ul>
                        {minute.actionItems.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))
            )}
          </div>

          {totalMinutesPages > 1 && (
            <div className="pagination">
              <button
                type="button"
                className="page-control"
                onClick={() => setMinutesPage((page) => Math.max(1, page - 1))}
                disabled={minutesPage === 1}
              >
                Previous
              </button>
              <span>
                Page {minutesPage} of {totalMinutesPages}
              </span>
              <button
                type="button"
                className="page-control"
                onClick={() => setMinutesPage((page) => Math.min(totalMinutesPages, page + 1))}
                disabled={minutesPage === totalMinutesPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default EventsSection
