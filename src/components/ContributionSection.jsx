import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilter,
  faCircleCheck,
  faCircleDot,
  faCreditCard,
  faUser,
  faBuildingColumns,
  faChevronLeft,
  faChevronRight,
  faReceipt,
} from '@fortawesome/free-solid-svg-icons'
import './ContributionSection.css'

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <header className="section-header">
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </header>
  )
}

function StatusBadge({ status }) {
  const isCompleted = status === 'completed'
  return (
    <span className={`status-badge ${isCompleted ? 'status-badge--completed' : 'status-badge--active'}`}>
      <FontAwesomeIcon icon={isCompleted ? faCircleCheck : faCircleDot} aria-hidden="true" />
      {isCompleted ? 'Completed' : 'Active'}
    </span>
  )
}

function PaymentBox({ paymentDetails }) {
  return (
    <div className="payment-box">
      <div className="payment-box-header">
        <FontAwesomeIcon icon={faReceipt} aria-hidden="true" />
        <span>Payment details</span>
      </div>
      <dl className="payment-box-list">
        <div className="payment-box-row">
          <dt>
            <FontAwesomeIcon icon={faBuildingColumns} aria-hidden="true" />
            Account
          </dt>
          <dd>{paymentDetails.account}</dd>
        </div>
        <div className="payment-box-row">
          <dt>
            <FontAwesomeIcon icon={faUser} aria-hidden="true" />
            Name
          </dt>
          <dd>{paymentDetails.name}</dd>
        </div>
        <div className="payment-box-row">
          <dt>
            <FontAwesomeIcon icon={faCreditCard} aria-hidden="true" />
            Method
          </dt>
          <dd>{paymentDetails.method}</dd>
        </div>
      </dl>
    </div>
  )
}

function ContributionCard({ event, fallbackPaymentInfo }) {
  const paymentDetails = event.paymentInfo || fallbackPaymentInfo

  return (
    <article className="contribution-card">
      <header className="contribution-card-header">
        <h3 className="contribution-card-title">{event.title}</h3>
        <StatusBadge status={event.status} />
      </header>

      {event.image && (
        <div className="contribution-card-media">
          <img
            className="contribution-image"
            src={event.image}
            alt={event.title}
            loading="lazy"
          />
        </div>
      )}

      <p className="contribution-card-subtitle">{event.subtitle}</p>

      <div className="donor-list">
        <span className="donor-list-label">Contributors</span>
        <ul>
          {event.donors.map((donor) => (
            <li key={`${event.title}-${donor.name}`} className="donor-row">
              <span className="donor-name">{donor.name}</span>
              <strong className="donor-amount">{donor.amount}</strong>
            </li>
          ))}
        </ul>
      </div>

      <PaymentBox paymentDetails={paymentDetails} />
    </article>
  )
}

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
  const isEmpty = pagedContributions.length === 0

  return (
    <section className="section contributions" aria-labelledby="contributions-heading">
      <SectionHeader
        eyebrow="Give & track"
        title="Contribution Updates"
        subtitle="Current levy and support contributions for the group. All payments are routed to the alumni account shown on each card."
      />

      <div className="contribution-controls">
        <div className="filter-bar" role="tablist" aria-label="Filter contributions by status">
          <span className="filter-bar-label">
            <FontAwesomeIcon icon={faFilter} aria-hidden="true" />
            Filter
          </span>
          {contributionStatusOptions.map((option) => {
            const active = contributionStatusFilter === option.id
            return (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={active ? 'filter-pill filter-pill--active' : 'filter-pill'}
                onClick={() => {
                  setContributionStatusFilter(option.id)
                  setContributionPage(1)
                }}
              >
                {option.label}
              </button>
            )
          })}
        </div>
        <div className="contribution-meta">
          {filteredCount === 0
            ? 'No contributions match this filter'
            : `Showing ${filteredCount} contribution${filteredCount === 1 ? '' : 's'}, newest first`}
        </div>
      </div>

      {isEmpty ? (
        <div className="contribution-empty">
          <p>No contributions to display for this filter.</p>
          <button
            type="button"
            className="filter-pill filter-pill--active"
            onClick={() => {
              setContributionStatusFilter('all')
              setContributionPage(1)
            }}
          >
            Show all contributions
          </button>
        </div>
      ) : (
        <div className="contribution-grid">
          {pagedContributions.map((event) => (
            <ContributionCard
              key={event.title}
              event={event}
              fallbackPaymentInfo={paymentInfo}
            />
          ))}
        </div>
      )}

      {totalContributionPages > 1 && (
        <nav className="pagination" aria-label="Contribution pages">
          <button
            type="button"
            className="page-control"
            onClick={() => setContributionPage((page) => Math.max(1, page - 1))}
            disabled={contributionPage === 1}
            aria-label="Previous page"
          >
            <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
            <span>Previous</span>
          </button>

          <span className="pagination-status" aria-live="polite">
            Page <strong>{contributionPage}</strong> of {totalContributionPages}
          </span>

          <button
            type="button"
            className="page-control"
            onClick={() =>
              setContributionPage((page) => Math.min(totalContributionPages, page + 1))
            }
            disabled={contributionPage === totalContributionPages}
            aria-label="Next page"
          >
            <span>Next</span>
            <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
          </button>
        </nav>
      )}
    </section>
  )
}

export default ContributionSection