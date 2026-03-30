import React from 'react'

function placeholderImage(name) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=ffffff&size=256`
}

function ProfileSection({ selectedClassmate, profile, paymentInfo, onBack, isLate }) {
  const profileFacts = profile?.facts ?? [
    'Valued member of the alumni community.',
    'Listed in the class roster from the 2013 association.',
    'Open for updates and member details.',
  ]

  return (
    <section className="section classmates">
      <div className="section-header">
        <button className="back-button" type="button" onClick={onBack}>
          ← Back to roster
        </button>
        <h2>
          {selectedClassmate}
          {isLate && <span className="late-badge">Late</span>}
        </h2>
        <p>Profile page for the selected classmate.</p>
      </div>

      <div className="profile-card">
        <img
          className="profile-photo"
          src={placeholderImage(selectedClassmate)}
          alt={`Profile of ${selectedClassmate}`}
        />
        <div className="profile-content">
          <h3>{selectedClassmate}</h3>
          <p className="profile-role">
            {profile?.occupation ?? 'Alumni member of Excellent Wisdom Students'}
          </p>
          <div className="profile-facts">
            <h4>About {selectedClassmate}</h4>
            <ul>
              {profileFacts.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </div>
          <div className="profile-actions">
            <div>
              <span>Contact</span>
              <strong>{paymentInfo.name}</strong>
            </div>
            <div>
              <span>Support ledger</span>
              <strong>{paymentInfo.account}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileSection
