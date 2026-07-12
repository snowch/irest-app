import { NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Learn from './pages/Learn'
import LearnModule from './pages/LearnModule'
import Principles from './pages/Principles'
import PrincipleDetail from './pages/PrincipleDetail'
import PracticeList from './pages/PracticeList'
import PracticeSession from './pages/PracticeSession'
import Recordings from './pages/Recordings'
import ProgressPage from './pages/ProgressPage'
import About from './pages/About'

function Nav() {
  const tabs = [
    { to: '/', label: 'Home', end: true },
    { to: '/learn', label: 'Learn' },
    { to: '/practice', label: 'Practice' },
    { to: '/recordings', label: 'Audio' },
    { to: '/progress', label: 'Progress' },
    { to: '/about', label: 'About' },
  ]
  return (
    <nav className="tabbar" aria-label="Primary">
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
          <Route path="/practice" element={<PracticeList />} />
          <Route path="/practice/:slug" element={<PracticeSession />} />
          <Route path="/recordings" element={<Recordings />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Nav />
    </div>
  )
}
