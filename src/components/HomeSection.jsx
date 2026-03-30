import React from 'react'

function HomeSection() {
  return (
    <>
      <section className="section intro">
        <h2>About Our Group</h2>
        <p>
          Excellent Wisdom Students is a community of former classmates from the 2013 alumni association.
          We connect, share achievements, and preserve our school memories.
        </p>
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
    </>
  )
}

export default HomeSection
