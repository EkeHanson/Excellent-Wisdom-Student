import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHandshake,
  faChampagneGlasses,
  faHandHoldingHeart,
  faArrowRight,
  faEnvelope,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons'
import './HomeSection.css'

const UNION_OBJECTIVES = [
  'To promote friendship, cooperation, and professional networking among members of the Class of 2013.',
  'To maintain a lifelong relationship between the alumni and the school through regular communication, meetings, and events.',
  'To organize reunions, mentorship programs, and social gatherings for members\' interaction and development.',
  'To support the alma mater in areas such as academic improvement, infrastructure, and student welfare.',
  'To establish welfare initiatives to assist members in need, such as during emergencies or career challenges.',
  'To encourage and support the educational and professional advancement of members through training, seminars, or workshops.',
  'To promote community service, leadership, and good citizenship among members.',
]

const PILLARS = [
  {
    icon: faHandshake,
    title: 'Reconnect',
    description: 'Stay in touch with classmates, plan reunions, and build lasting networks.',
  },
  {
    icon: faChampagneGlasses,
    title: 'Celebrate',
    description: 'Honor our shared history with events, updates, and alumni stories.',
  },
  {
    icon: faHandHoldingHeart,
    title: 'Support',
    description: 'Share contributions, announcements, and emergency support for our members.',
  },
]

function SectionHeader({ id, eyebrow, title, subtitle }) {
  return (
    <header className="section-header">
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </header>
  )
}

function ObjectiveItem({ index, children }) {
  return (
    <li className="objective-item">
      <span className="objective-index" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <p className="objective-text">{children}</p>
    </li>
  )
}

function PillarCard({ icon, title, description }) {
  return (
    <article className="pillar-card">
      <span className="pillar-icon" aria-hidden="true">
        <FontAwesomeIcon icon={icon} />
      </span>
      <h3 className="pillar-title">{title}</h3>
      <p className="pillar-description">{description}</p>
    </article>
  )
}

function ContactRow({ label, icon, href, children, external }) {
  return (
    <a
      href={href}
      className="contact-row"
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      <span className="contact-label">
        <FontAwesomeIcon icon={icon} aria-hidden="true" />
        {label}
      </span>
      <span className="contact-value">{children}</span>
      <span className="contact-arrow" aria-hidden="true">
        <FontAwesomeIcon icon={faArrowRight} />
      </span>
    </a>
  )
}

function HomeSection({ classContact }) {
  return (
    <div className="home">
      {/* ── About ────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="about-heading">
        <SectionHeader
          eyebrow="Who we are"
          id="about-heading"
          title="About Our Group"
        />
        <p className="intro-copy">
          Excellent Wisdom Students (EWS) is the alumni community for the 2013 class of
          Government Secondary School Ngo. Our slogan is{' '}
          <strong className="intro-slogan">WISDOM IS POWER</strong>. We exist to remain
          united, share ideas, solve problems, and help each member grow.
        </p>
      </section>

      {/* ── Objectives ───────────────────────────────────────────── */}
      <section className="section section--tinted" aria-labelledby="objectives-heading">
        <SectionHeader
          eyebrow="What guides us"
          id="objectives-heading"
          title="Our Objectives"
          subtitle="The principles that anchor our community"
        />
        <ol className="objectives-list">
          {UNION_OBJECTIVES.map((objective, index) => (
            <ObjectiveItem key={index} index={index}>
              {objective}
            </ObjectiveItem>
          ))}
        </ol>
      </section>

      {/* ── Pillars ──────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="pillars-heading">
        <SectionHeader
          eyebrow="What we do"
          id="pillars-heading"
          title="Three Pillars"
          subtitle="The heartbeat of our alumni community"
        />
        <div className="pillars-grid">
          {PILLARS.map(({ icon, title, description }) => (
            <PillarCard key={title} icon={icon} title={title} description={description} />
          ))}
        </div>
      </section>

      {/* ── Get Involved ─────────────────────────────────────────── */}
      <section className="section section--involved" aria-labelledby="involved-heading">
        <div className="involved-inner">
          <SectionHeader eyebrow="Join in" id="involved-heading" title="Get Involved" />
          <p className="involved-copy">
            Want to contribute to the website or share updates? Send new donors,
            announcements, or event details to the alumni chairman — every voice
            shapes our story.
          </p>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────── */}
      {classContact && (
        <section className="section" aria-labelledby="contact-heading">
          <SectionHeader
            eyebrow="Stay close"
            id="contact-heading"
            title="Class Group"
            subtitle="Stay connected with your classmates"
          />
          <div className="contact-list">
            {classContact.email && (
              <ContactRow
                label="Email"
                icon={faEnvelope}
                href={`mailto:${classContact.email}`}
              >
                {classContact.email}
              </ContactRow>
            )}
            {classContact.whatsapp && (
              <ContactRow
                label="WhatsApp"
                icon={faCommentDots}
                href={classContact.whatsapp}
                external
              >
                Join the Class WhatsApp Group
              </ContactRow>
            )}
          </div>
        </section>
      )}
    </div>
  )
}

export default HomeSection