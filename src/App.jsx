import { useMemo, useState } from 'react'
import './App.css'
import classmatesText from '../classmates names.txt?raw'
import {
  paymentInfo,
  contributionEvents,
  contributionStatusOptions,
  contributionPageSize,
  pinnedRosterNames,
  classmateProfiles,
  lateMembers,
  upcomingEvents,
  meetingMinutes,
} from './data'
import ContributionSection from './components/ContributionSection'
import HomeSection from './components/HomeSection'
import PageNav from './components/PageNav'
import ProfileSection from './components/ProfileSection'
import RosterSection from './components/RosterSection'
import DocumentsSection from './components/DocumentsSection'
import EventsSection from './components/EventsSection'

const logoUrl = new URL('../logo.jpeg', import.meta.url).href
const certificatePdf = new URL('../CERTIFICATE - EXCELLENT WISDOM STUDENTS NGO 2013 ALUMNI ASSOCIATION (1).pdf', import.meta.url).href
const statusReportPdf = new URL('../Status Report CAC - EXCELLENT WISDOM STUDENTS NGO 2013 ALUMNI ASSOCIATION.pdf', import.meta.url).href
const meetingMinutePdf = new URL('../AWS MEETING MINUTE.pdf', import.meta.url).href

const placeholderImage = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=ffffff&size=256`

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [selectedClassmate, setSelectedClassmate] = useState(null)
  const [contributionStatusFilter, setContributionStatusFilter] = useState('all')
  const [contributionPage, setContributionPage] = useState(1)
  const [rosterSearch, setRosterSearch] = useState('')

  const classmates = useMemo(
    () =>
      Array.from(
        new Set(
          classmatesText
            .split(/\r?\n/)
            .map((line) => line.replace(/^\s*\d+\.?\s*/, '').trim())
            .map((line) => line.replace(/\s{2,}/g, ' '))
            .filter(
              (line) =>
                line &&
                !line.startsWith('<') &&
                !/^Names of our Classmates/i.test(line) &&
                !/^Names of our Classmates\./i.test(line),
            ),
        ),
      ).sort((a, b) => a.localeCompare(b)),
    [],
  )

  const profile = selectedClassmate ? classmateProfiles[selectedClassmate] : null

  const pinnedRosterSet = new Set(pinnedRosterNames)
  const lateMembersSet = new Set(lateMembers)
  const pinnedClassmates = classmates.filter((name) => pinnedRosterSet.has(name))
  const otherClassmates = classmates.filter((name) => !pinnedRosterSet.has(name))
  const sortedClassmates = [...pinnedClassmates, ...otherClassmates]

  const visibleClassmates = sortedClassmates.filter((name) =>
    name.toLowerCase().includes(rosterSearch.trim().toLowerCase()),
  )

  const filteredContributions = useMemo(() => {
    return contributionEvents
      .filter((event) => contributionStatusFilter === 'all' || event.status === contributionStatusFilter)
      .slice()
      .sort((a, b) => (b.order || 0) - (a.order || 0))
  }, [contributionStatusFilter])

  const totalContributionPages = Math.max(1, Math.ceil(filteredContributions.length / contributionPageSize))
  const pagedContributions = filteredContributions.slice(
    (contributionPage - 1) * contributionPageSize,
    contributionPage * contributionPageSize,
  )

  const handleNavigate = (view) => {
    setCurrentView(view)
    if (view !== 'roster') {
      setSelectedClassmate(null)
    }
  }

  const handleOpenProfile = (name) => {
    setSelectedClassmate(name)
    setCurrentView('profile')
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <img className="hero-logo" src={logoUrl} alt="Excellent Wisdom Students logo" />
        <div>
          <h1>Excellent Wisdom Students</h1>
          <p>Secondary school classmates united as an alumni association.</p>
          <p className="hero-note">
            Use the tabs below to explore contributors, members list, and documents.
          </p>
        </div>
      </header>

      <PageNav currentView={currentView} onNavigate={handleNavigate} />

      {currentView === 'home' && <HomeSection />}

      {currentView === 'contributions' && (
        <ContributionSection
          paymentInfo={paymentInfo}
          contributionStatusOptions={contributionStatusOptions}
          contributionStatusFilter={contributionStatusFilter}
          setContributionStatusFilter={(status) => {
            setContributionStatusFilter(status)
            setContributionPage(1)
          }}
          contributionPage={contributionPage}
          setContributionPage={setContributionPage}
          totalContributionPages={totalContributionPages}
          pagedContributions={pagedContributions}
          filteredCount={filteredContributions.length}
        />
      )}

      {currentView === 'roster' && (
        <RosterSection
          classmates={visibleClassmates}
          searchTerm={rosterSearch}
          onSearchTermChange={setRosterSearch}
          onViewProfile={handleOpenProfile}
          lateMembersSet={lateMembersSet}
        />
      )}

      {currentView === 'profile' && selectedClassmate && (
        <ProfileSection
          selectedClassmate={selectedClassmate}
          profile={profile}
          paymentInfo={paymentInfo}
          onBack={() => setCurrentView('roster')}
          isLate={lateMembersSet.has(selectedClassmate)}
        />
      )}

      {currentView === 'documents' && (
        <DocumentsSection
          certificatePdf={certificatePdf}
          statusReportPdf={statusReportPdf}
          meetingMinutePdf={meetingMinutePdf}
        />
      )}

      {currentView === 'events' && (
        <EventsSection
          events={upcomingEvents}
          meetingMinutes={meetingMinutes}
        />
      )}
    </div>
  )
}

export default App
