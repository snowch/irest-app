import { useEffect, useRef } from 'react'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Learn from './pages/Learn'
import LearnModule from './pages/LearnModule'
import Principles from './pages/Principles'
import PrincipleDetail from './pages/PrincipleDetail'
import Prepare from './pages/Prepare'
import Practice from './pages/Practice'
import ProgressPage from './pages/ProgressPage'
import About from './pages/About'

function Nav() {
  const tabs = [
    { to: '/', label: 'Home', end: true },
    { to: '/learn', label: 'Learn' },
    { to: '/prepare', label: 'Prepare' },
    { to: '/practice', label: 'Practice' },
    { to: '/progress', label: 'Progress' },
    { to: '/about', label: 'About' },
  ]
  // Publish the tab bar's real height (including safe-area padding) as a CSS
  // variable so the fixed player bar can sit exactly on top of it, regardless
  // of device chrome.
  const navRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = navRef.current
    if (!el) return
    const set = () =>
      document.documentElement.style.setProperty('--tabbar-h', `${el.offsetHeight}px`)
    set()
    const ro = new ResizeObserver(set)
    ro.observe(el)
    window.addEventListener('resize', set)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', set)
    }
  }, [])

  return (
    <nav ref={navRef} className="tabbar" aria-label="Primary">
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.end}
          className={({ isActive }) => 'tab' + (isActive ? ' tab--active' : '')}
        >
          {t.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default function App() {
  return (
    <div className="app-shell">
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:slug" element={<LearnModule />} />
          <Route path="/principles" element={<Principles />} />
          <Route path="/principles/:slug" element={<PrincipleDetail />} />
          <Route path="/prepare" element={<Prepare />} />
          <Route path="/practice" element={<Practice />} />
          {/* Legacy links from earlier versions */}
          <Route path="/recordings" element={<Navigate to="/practice" replace />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Nav />
    </div>
  )
}
