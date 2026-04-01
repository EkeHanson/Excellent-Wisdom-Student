import React from 'react'
import './ProfileSection.css' // We'll create this CSS file

const profileImages = import.meta.glob('../assets/profile-pictures/*.{png,jpg,jpeg,webp}', {
  eager: true,
  as: 'url',
})

const profileImageMap = Object.fromEntries(
  Object.entries(profileImages).map(([path, url]) => {
    const fileName = path.split('/').pop()
    const name = fileName?.replace(/\.(png|jpe?g|webp)$/i, '')
    return [name, url]
  }),
)

function placeholderImage(name) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=ffffff&size=256`
}

function getProfileImage(name) {
  return profileImageMap[name] ?? placeholderImage(name)
}

function ProfileSection({ selectedClassmate, profile, paymentInfo, onBack, isLate }) {
  const profileFacts = profile?.facts ?? [
    'Valued member of the alumni community.',
    'Listed in the class roster from the 2013 association.',
    'Open for updates and member details.',
  ]

  return (
    <div className="profile-section-container">
      <div className="profile-section-wrapper">
        {/* Header Section */}
        <div className="profile-header">
          <button className="back-button" type="button" onClick={onBack}>
            <span className="back-arrow">←</span>
            <span className="back-text">Back to Members list</span>
          </button>
          
          <div className="profile-title-section">
            <div className="name-wrapper">
              <h1 className="profile-name">
                {selectedClassmate}
                {isLate && <span className="late-badge">Late</span>}
              </h1>
            </div>
            <p className="profile-description">
              Profile page for the {selectedClassmate}
            </p>
          </div>
        </div>

        {/* Main Profile Card */}
        <div className="profile-card">
          {/* Image Section */}
          <div className="profile-image-wrapper">
            <div className="profile-image-container">
              <img
                className="profile-photo"
                src={getProfileImage(selectedClassmate)}
                alt={`Profile of ${selectedClassmate}`}
                loading="eager"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="profile-content-wrapper">
            <div className="profile-info">
              <h2 className="profile-name-large">{selectedClassmate}</h2>
              <p className="profile-role">
                {profile?.occupation ?? 'Alumni member of Excellent Wisdom Students'}
              </p>

              {/* Facts Section */}
              <div className="profile-facts">
                <h3 className="facts-title">
                  About {selectedClassmate}
                </h3>
                <ul className="facts-list">
                  {profileFacts.map((fact, index) => (
                    <li key={index} className="fact-item">
                      <span className="fact-bullet">•</span>
                      <span className="fact-text">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Information */}
              {(profile?.phone || profile?.email) && (
                <div className="contact-info">
                  <h3 className="contact-title">Contact Information</h3>
                  <div className="contact-details">
                    {profile?.phone && (
                      <div className="contact-detail">
                        <span className="contact-label">Phone:</span>
                        <a 
                          href={`tel:${profile.phone}`} 
                          className="contact-value contact-link"
                        >
                          {profile.phone}
                        </a>
                      </div>
                    )}
                    {profile?.email && (
                      <div className="contact-detail">
                        <span className="contact-label">Email:</span>
                        <a 
                          href={`mailto:${profile.email}`} 
                          className="contact-value contact-link"
                        >
                          {profile.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSection