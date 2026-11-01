import React from 'react'
import './SiteHeader.css'

function SiteHeader({ logoSrc, logoAlt = 'Excellent Wisdom Students logo' }) {
  return (
    <header className="site-hero" role="banner">
      <div className="site-hero-inner">
        {logoSrc && (
          <img
            src={logoSrc}
            alt={logoAlt}
            className="site-hero-logo"
          />
        )}
        <span className="site-hero-badge">Class of 2013 · GSS Ngo</span>
        <h1 className="site-hero-title">
          Excellent Wisdom <span className="site-hero-title-accent">Students</span>
        </h1>
        <p className="site-hero-slogan">Wisdom is Power</p>
        <p className="site-hero-copy">
          The alumni community of Government Secondary School Ngo — united by
          friendship, driven by purpose, and committed to lifting one another.
        </p>
      </div>
    </header>
  )
}

export default SiteHeader