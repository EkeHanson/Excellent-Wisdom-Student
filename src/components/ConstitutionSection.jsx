import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faScroll,
  faUsers,
  faUserTie,
  faCheckToSlot,
  faArrowsRotate,
  faCalendarDays,
  faGavel,
  faEnvelopeOpenText,
  faLayerGroup,
  faBuildingColumns,
} from '@fortawesome/free-solid-svg-icons'
import './ConstitutionSection.css'

const SECTIONS = [
  { id: 'section-1', number: 'I', icon: faScroll, title: 'Name, Slogan, and Purpose' },
  { id: 'section-2', number: 'II', icon: faUsers, title: 'Membership' },
  { id: 'section-3', number: 'III', icon: faUserTie, title: 'Officers and Duties' },
  { id: 'section-4', number: 'IV', icon: faCheckToSlot, title: 'Elections' },
  { id: 'section-5', number: 'V', icon: faArrowsRotate, title: 'Removal, Terms, and Vacancies' },
  { id: 'section-6', number: 'VI', icon: faCalendarDays, title: 'Meetings' },
  { id: 'section-7', number: 'VII', icon: faGavel, title: 'Activities and Sanctions' },
  { id: 'section-8', number: 'VIII', icon: faEnvelopeOpenText, title: 'Invitations and Contributions' },
  { id: 'section-9', number: 'IX', icon: faLayerGroup, title: 'Committees and Amendments' },
  { id: 'section-10', number: 'X', icon: faBuildingColumns, title: 'Bank Account Signatories' },
]

const OFFICER_POSITIONS = [
  'Chairman',
  'Vice Chairman',
  'Secretary',
  'Assistant Secretary',
  'Treasurer',
  'Public Relation Officer (PRO)',
]

const WEEKLY_THEMES = [
  { day: 'Monday', theme: 'Business' },
  { day: 'Tuesday', theme: 'Knowledge' },
  { day: 'Wednesday', theme: 'Women and Health' },
  { day: 'Thursday', theme: 'Throwbacks' },
  { day: 'Friday', theme: 'Relationships' },
  { day: 'Saturday', theme: 'Member Check-ins' },
]

function KeyFact({ label, value }) {
  return (
    <div className="key-fact">
      <span className="key-fact-label">{label}</span>
      <span className="key-fact-value">{value}</span>
    </div>
  )
}

function ArticleHeader({ icon, number, title }) {
  return (
    <header className="article-header">
      <span className="article-icon" aria-hidden="true">
        <FontAwesomeIcon icon={icon} />
      </span>
      <div>
        <span className="article-eyebrow">Section {number}</span>
        <h3 className="article-title">{title}</h3>
      </div>
    </header>
  )
}

function ConstitutionSection() {
  return (
    <section className="constitution" aria-labelledby="constitution-heading">
      {/* ── Hero / Intro ─────────────────────────────────────────── */}
      <header className="constitution-hero">
        <span className="constitution-badge">Official Document</span>
        <h1 id="constitution-heading" className="constitution-title">
          Association Constitution
        </h1>
        <p className="constitution-lede">
          The Excellent Wisdom Students constitution defines our name, slogan,
          membership, officers, meetings, contributions, and governance principles.
        </p>
      </header>

      <div className="constitution-layout">
        {/* ── Table of contents ──────────────────────────────────── */}
        <aside className="constitution-toc" aria-label="Table of contents">
          <p className="toc-title">Contents</p>
          <ol className="toc-list">
            {SECTIONS.map(({ id, number, title }) => (
              <li key={id}>
                <a href={`#${id}`} className="toc-link">
                  <span className="toc-number">{number}</span>
                  <span className="toc-label">{title}</span>
                </a>
              </li>
            ))}
          </ol>
        </aside>

        {/* ── Sections ───────────────────────────────────────────── */}
        <div className="constitution-body">
          {/* Section I */}
          <article id="section-1" className="article">
            <ArticleHeader icon={SECTIONS[0].icon} number="I" title={SECTIONS[0].title} />
            <div className="key-facts">
              <KeyFact label="Official Name" value="Excellent Wisdom Student (EWS)" />
              <KeyFact label="Slogan" value="Wisdom is Power" />
            </div>
            <p>
              The association uses this name and slogan for publicity, meetings,
              events, and all official correspondence.
            </p>
            <p>
              <strong>Purpose:</strong> remain united as classmates, share ideas, solve
              problems, make decisions, and learn in ways that improve members
              individually.
            </p>
          </article>

          {/* Section II */}
          <article id="section-2" className="article">
            <ArticleHeader icon={SECTIONS[1].icon} number="II" title={SECTIONS[1].title} />
            <p>
              All students in the 2013 class of Government Secondary School Ngo are
              members, excluding only those who attended solely to register for WAEC.
            </p>
            <div className="key-facts">
              <KeyFact label="Annual Dues" value="₦1,000" />
            </div>
            <ul className="check-list">
              <li>Members must support the purpose of EWS.</li>
              <li>
                No discrimination on education, rank, disability, religion, tribe,
                sex, marital status, or age.
              </li>
            </ul>
            <p>
              All members may attend meetings and events, vote and be nominated in
              elections, and host or sponsor gatherings. Members may be suspended by
              a simple majority vote after one week notice.
            </p>
          </article>

          {/* Section III */}
          <article id="section-3" className="article">
            <ArticleHeader icon={SECTIONS[2].icon} number="III" title={SECTIONS[2].title} />
            <p className="article-subtitle">Officer positions</p>
            <div className="officer-grid">
              {OFFICER_POSITIONS.map((position) => (
                <span key={position} className="officer-chip">
                  {position}
                </span>
              ))}
            </div>
            <p>
              Officers must support the purpose of EWS and be active members. The
              Chairman leads meetings and votes only to break ties. The Vice Chairman
              fills in when needed. The Secretary records minutes and coordinates
              notices, with support from the Assistant Secretary. The Treasurer
              maintains financial records, prepares budgets, and keeps funds within
              the EWS accounting system. The PRO shares meeting and event information
              with members.
            </p>
          </article>

          {/* Section IV */}
          <article id="section-4" className="article">
            <ArticleHeader icon={SECTIONS[3].icon} number="IV" title={SECTIONS[3].title} />
            <p>
              An election committee (Eleco) is formed by the Chairman for each
              election. Nominations happen during the election meeting every three
              years. Each member has one vote, and no absentee or proxy voting is
              allowed.
            </p>
            <p>
              A simple majority elects officers. In case of a tie, the Eleco Chairman
              decides by chance (coin flip, yes/no paper, etc.).
            </p>
          </article>

          {/* Section V */}
          <article id="section-5" className="article">
            <ArticleHeader icon={SECTIONS[4].icon} number="V" title={SECTIONS[4].title} />
            <div className="key-facts">
              <KeyFact label="Term of Office" value="3 years" />
              <KeyFact label="Resignation Notice" value="2 weeks (written)" />
            </div>
            <p>
              Officers may be removed for duty failure or membership violation by a
              simple majority vote after one week notice. Resignation requires written
              notice to the Chairman or Vice Chairman and should include two weeks
              notice.
            </p>
            <p>
              Vacancies are filled through a new nomination and election process.
              Temporary fill-ins may be selected by vote before meetings if needed.
            </p>
          </article>

          {/* Section VI */}
          <article id="section-6" className="article">
            <ArticleHeader icon={SECTIONS[5].icon} number="VI" title={SECTIONS[5].title} />
            <div className="key-facts">
              <KeyFact label="Special Meetings" value="Twice a year (January & July)" />
              <KeyFact label="Quorum" value="At least 2 Excos" />
            </div>
            <p>
              Emergency meetings may be called by the Chairman whenever urgent
              attention is required. Any member may host or sponsor a meeting. Hosts
              and sponsors should announce their intention in a regular or special
              meeting.
            </p>
          </article>

          {/* Section VII */}
          <article id="section-7" className="article">
            <ArticleHeader icon={SECTIONS[6].icon} number="VII" title={SECTIONS[6].title} />
            <p className="article-subtitle">Weekly activity themes</p>
            <ul className="theme-list">
              {WEEKLY_THEMES.map(({ day, theme }) => (
                <li key={day} className="theme-item">
                  <span className="theme-day">{day}</span>
                  <span className="theme-name">{theme}</span>
                </li>
              ))}
            </ul>
            <p className="article-subtitle">Sanctions</p>
            <ul className="check-list">
              <li>
                Members who refuse to pay dues can be suspended from the group until
                payment.
              </li>
              <li>
                Members who insult others may be removed until they apologize.
              </li>
              <li>
                Members who do not contribute may be asked to support three past
                events before receiving contributions again.
              </li>
            </ul>
          </article>

          {/* Section VIII */}
          <article id="section-8" className="article">
            <ArticleHeader icon={SECTIONS[7].icon} number="VIII" title={SECTIONS[7].title} />
            <p>
              Invitations requiring contributions must be made at least one month
              before the event and cost ₦3,000 to officially invite the class.
              Members can invite the class no more than twice per year, and invitation
              requests should go through the Chairman or an Exco member.
            </p>
            <div className="key-facts">
              <KeyFact label="Class Invitation" value="₦3,000" />
              <KeyFact label="Event Contribution" value="₦1,000 (minimum)" />
              <KeyFact label="Double Wedding" value="₦5,000 (each member)" />
              <KeyFact label="Birthday Airtime" value="₦200 (from each active member)" />
              <KeyFact label="Contribution Window" value="1 week after event" />
            </div>
          </article>

          {/* Section IX */}
          <article id="section-9" className="article">
            <ArticleHeader icon={SECTIONS[8].icon} number="IX" title={SECTIONS[8].title} />
            <p>
              Committees may be appointed by majority vote to handle specific tasks
              and are supervised by the Chairman or a delegated Exco member.
            </p>
            <p>
              Constitution amendments require a two-thirds vote of the membership at a
              regular meeting and one meeting&apos;s prior notice.
            </p>
          </article>

          {/* Section X */}
          <article id="section-10" className="article">
            <ArticleHeader icon={SECTIONS[9].icon} number="X" title={SECTIONS[9].title} />
            <div className="key-facts">
              <KeyFact label="Signatory Review" value="Every 3 years" />
              <KeyFact label="Primary Signatories" value="Chairman, Secretary, Treasurer" />
              <KeyFact label="ATM Card" value="Not permitted" />
            </div>
            <p>
              Past and incumbent officers must visit the bank together to update
              signatories.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default ConstitutionSection