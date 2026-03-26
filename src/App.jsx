import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import scpData from './scpData.json'
import ClassifiedFile from './ClassifiedFile.jsx'
import './classified.css'

const classColors = { Safe: '#2d6a4f', Euclid: '#b5600d', Keter: '#8b1a1a' }

/* TOP NAV BAR */
function TopBar() {
  const [navOpen, setNavOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <header className="topbar">
        <Link className="topbar-logo" to="/">
          <span className="logo-scp">SCP</span>
          <span className="logo-sub">FOUNDATION</span>
        </Link>

        <nav className="topbar-nav">
          {scpData.map((scp) => (
            <Link
              key={scp.ScpID}
              className={`topbar-link ${location.pathname === `/scp/${scp.ScpID}` ? 'active' : ''}`}
              style={{ '--class-color': classColors[scp.objectClass] || '#555' }}
              to={`/scp/${scp.ScpID}`}
            >
              {scp.item}
            </Link>
          ))}
        </nav>

        <button className="hamburger" onClick={() => setNavOpen(!navOpen)}>
          <span /><span /><span />
        </button>
      </header>

      {navOpen && (
        <div className="mobile-nav">
          <Link className="mobile-nav-item" to="/" onClick={() => setNavOpen(false)}>
            ⌂ Home
          </Link>
          {scpData.map((scp) => (
            <Link
              key={scp.ScpID}
              className={`mobile-nav-item ${location.pathname === `/scp/${scp.ScpID}` ? 'active' : ''}`}
              to={`/scp/${scp.ScpID}`}
              onClick={() => setNavOpen(false)}
            >
              <span className={`class-badge badge-${scp.objectClass.toLowerCase()}`}>
                {scp.objectClass}
              </span>
              {scp.item} — {scp.nickname}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

/*  FILE NAV BAR (prev / next) */
function FileNavBar() {
  const { id } = useParams()
  const navigate = useNavigate()
  const currentIndex = scpData.findIndex((s) => s.ScpID === parseInt(id))

  const goPrev = () => {
    const prevIndex = currentIndex === 0 ? scpData.length - 1 : currentIndex - 1
    navigate(`/scp/${scpData[prevIndex].ScpID}`)
  }

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % scpData.length
    navigate(`/scp/${scpData[nextIndex].ScpID}`)
  }

  return (
    <div className="file-nav-bar">
      <button className="file-nav-btn" onClick={goPrev}>← PREV FILE</button>
      <span className="file-counter">
        FILE {currentIndex + 1} / {scpData.length}
      </span>
      <button className="file-nav-btn" onClick={goNext}>NEXT FILE →</button>
    </div>
  )
}

/* SCP FILE PAGE  */
function ScpFilePage() {
  return (
    <>
      <main className="main-content page-enter">
        <ClassifiedFile scp={scpData} />
      </main>
      <FileNavBar />
    </>
  )
}

/* HOME PAGE  */
function HomePage() {
  return (
    <main className="main-content page-enter">
      <div className="homepage">
        <div className="home-header">
          <div className="home-stamp">CLASSIFIED</div>
          <div className="home-logo-large">
            <div className="home-logo-symbol">☣</div>
            <h1 className="home-title">SCP FOUNDATION</h1>
            <p className="home-tagline">SECURE. CONTAIN. PROTECT.</p>
          </div>
          <p className="home-subtitle">
            PERSONNEL CLEARANCE LEVEL 4 REQUIRED &mdash; UNAUTHORISED ACCESS IS PROHIBITED
          </p>
        </div>

        <div className="home-divider">
          <span>ACTIVE CONTAINMENT FILES</span>
        </div>

        <div className="file-grid">
          {scpData.map((scp) => (
            <Link key={scp.ScpID} className="file-card" to={`/scp/${scp.ScpID}`}>
              <div
                className="file-card-class"
                style={{ background: classColors[scp.objectClass] || '#555' }}
              >
                {scp.objectClass}
              </div>
              <div className="file-card-id">{scp.item}</div>
              <div className="file-card-nick">{scp.nickname}</div>
              <div className="file-card-preview">{scp.description.slice(0, 90)}…</div>
              <div className="file-card-footer">OPEN FILE →</div>
            </Link>
          ))}
        </div>

        <footer className="home-footer">
          <p>SCP FOUNDATION INTERNAL DATABASE</p>
          <p>THIS DOCUMENT IS PROPERTY OF THE SCP FOUNDATION. UNAUTHORISED DISTRIBUTION IS PUNISHABLE UNDER FOUNDATION LAW.</p>
        </footer>
      </div>
    </main>
  )
}

/* APP ROOT */
function App() {
  return (
    <Router>
      <div className="app-root">
        <TopBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scp/:id" element={<ScpFilePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
