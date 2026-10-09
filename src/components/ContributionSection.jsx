import React from 'react'

function ContributionSection({
  paymentInfo,
  contributionStatusOptions,
  contributionStatusFilter,
  setContributionStatusFilter,
  contributionPage,
  setContributionPage,
  totalContributionPages,
  pagedContributions,
  filteredCount,
}) {
  return (
    <section className="section contributions">
      <div className="section-header">
        <h2>Contribution Updates</h2>
        <p>
          Current levy and support contributions for the group. All payments are routed to the alumni account below.
        </p>
      </div>

      <div className="contribution-controls">
        <div className="filter-bar">
          {contributionStatusOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={
                contributionStatusFilter === option.id ? 'filter-pill active' : 'filter-pill'
              }
              onClick={() => {
                setContributionStatusFilter(option.id)
                setContributionPage(1)
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="contribution-meta">
          Showing {filteredCount} contributions, newest first
        </div>
      </div>

      <div className="contribution-grid">
        {pagedContributions.map((event) => {
          const paymentDetails = event.paymentInfo || paymentInfo

          return (
            <article key={event.title} className="contribution-card">
              <div className="card-title-bar">
                <h3>{event.title}</h3>
                <span className={`status-badge ${event.status || 'active'}`}>
                  {event.status === 'completed' ? 'Completed' : 'Active'}
                </span>
              </div>

              {event.image && (
                <img className="contribution-image" src={event.image} alt={event.title} />
              )}

              <p>{event.subtitle}</p>
              <ul>
                {event.donors.map((donor) => (
                  <li key={`${event.title}-${donor.name}`}>
                    <span>{donor.name}</span>
                    <strong>{donor.amount}</strong>
                  </li>
                ))}
              </ul>
              <div className="payment-box">
                <span>Pay to:</span>
                <strong>{paymentDetails.account}</strong>
                <span>{paymentDetails.name}</span>
                <span>{paymentDetails.method}</span>
              </div>
            </article>
          )
        })}
      </div>

      {totalContributionPages > 1 && (
        <div className="pagination">
          <button
            type="button"
            className="page-control"
            onClick={() => setContributionPage((page) => Math.max(1, page - 1))}
            disabled={contributionPage === 1}
          >
            Previous
          </button>
          <span>
            Page {contributionPage} of {totalContributionPages}
          </span>
          <button
            type="button"
            className="page-control"
            onClick={() => setContributionPage((page) => Math.min(totalContributionPages, page + 1))}
            disabled={contributionPage === totalContributionPages}
          >
            Next
          </button>
        </div>
      )}
    </section>
  )
}

export default ContributionSection
