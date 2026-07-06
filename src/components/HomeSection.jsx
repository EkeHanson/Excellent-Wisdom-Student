import React from 'react'

const unionObjectives = [
  'To promote friendship, cooperation, and professional networking among members of the Class of 2013.',
  'To maintain a lifelong relationship between the alumni and the school through regular communication, meetings, and events.',
  'To organize reunions, mentorship programs, and social gatherings for members\' interaction and development.',
  'To support the alma mater in areas such as academic improvement, infrastructure, and student welfare.',
  'To establish welfare initiatives to assist members in need, such as during emergencies or career challenges.',
  'To encourage and support the educational and professional advancement of members through training, seminars, or workshops.',
  'To promote community service, leadership, and good citizenship among members.',
]

function HomeSection({ classContact }) {
  return (
    <>
      <section className="section intro">
        <h2>About Our Group</h2>
        <p>
          Excellent Wisdom Students (EWS) is the alumni community for the 2013 class of Government Secondary School Ngo.
          Our slogan is <strong>WISDOM IS POWER</strong>, and we exist to remain united, share ideas, solve problems, and help each member grow.
        </p>
      </section>

      <section className="section objectives">
        <h2>Group's Objectives</h2>
        <div className="objectives-grid">
          {unionObjectives.map((objective, index) => (
            <div key={index} className="objective-card">
              <span className="objective-number">{index + 1}</span>
              <p className="objective-text">{objective}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section features">
        <div>
          <h3>Reconnect</h3>
          <p>Stay in touch with classmates, plan reunions, and build lasting networks.</p>
        </div>
        <div>
          <h3>Celebrate</h3>
          <p>Honor our shared history with events, updates, and alumni stories.</p>
        </div>
        <div>
          <h3>Support</h3>
          <p>Share contributions, announcements, and emergency support for our members.</p>
        </div>
      </section>

      <section className="section contact">
        <h2>Get Involved</h2>
        <p>
          Want to contribute to the website or share updates? Share new donors, announcements, or event details with the alumni coordinator.
        </p>
      </section>

      {classContact && (
        <section className="section contact">
          <h2>Class Group</h2>
          <div className="contact-details">
            <div className="contact-detail">
              <span className="contact-label">Email:</span>
              <a 
                href={`mailto:${classContact.email}`} 
                className="contact-value contact-link"
              >
                {classContact.email}
              </a>
            </div>
            <div className="contact-detail">
              <span className="contact-label">WhatsApp:</span>
              <a 
                href={classContact.whatsapp} 
                target="_blank"
                rel="noopener noreferrer"
                className="contact-value contact-link"
              >
                Join Class WhatsApp Group
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default HomeSection