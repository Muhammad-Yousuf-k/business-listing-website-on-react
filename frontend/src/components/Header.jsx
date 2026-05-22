// src/components/Header.jsx

import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Search } from 'lucide-react'
import Btnone from './small compo/Btn-one'
import Btntwo from './small compo/Btn-two'
import ButtonOne from './ButtonOne'
import ButtonTwo from './ButtonTwo'
import UserMenu from './UserMenu'
import { useUser } from '../hooks/useUser'

const STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
  'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
]

/* ─── Reusable: close dropdown when clicking outside ─────────── */
function useClickOutside(ref, onClose) {
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose() }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [ref, onClose])
}

/* ─── States Dropdown ────────────────────────────────────────── */
function StatesDropdown({ mobile = false }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef(null)

  useClickOutside(ref, () => { setOpen(false); setQuery('') })

  const filtered = STATES.filter(s => s.toLowerCase().includes(query.toLowerCase()))

  if (mobile) {
    return (
      <div>
        <button
          onClick={() => setOpen(p => !p)}
          className="flex items-center justify-between w-full py-3 text-sm font-medium"
          style={{ color: 'var(--secondary-color)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span>States</span>
          <ChevronDown
            size={15}
            style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', color: 'var(--accent-color)' }}
          />
        </button>
        {open && (
          <div className="flex flex-col gap-0 pl-3 pb-2">
            <div className="mb-2">
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <Search size={13} style={{ color: '#9ca3af', flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Search state..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="text-sm w-full outline-none"
                  style={{ background: 'transparent', border: 'none', color: '#f0f0f0' }}
                />
              </div>
            </div>
            <div style={{ maxHeight: '160px', overflowY: 'auto' }}>
              {filtered.length > 0
                ? filtered.map(state => (
                  <Link
                    key={state}
                    to={`/search/?q=${encodeURIComponent(state)}&source=state`}
                    className="block py-1.5 text-sm"
                    style={{ color: '#d1d5db' }}
                    onClick={() => { setOpen(false); setQuery('') }}
                  >
                    {state}
                  </Link>
                ))
                : <p className="py-2 text-xs" style={{ color: '#6b7280' }}>No state found</p>
              }
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(p => !p)}
        className="flex items-center gap-1 text-sm font-medium nav-link"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--secondary-color)', padding: '4px 0' }}
      >
        States
        <ChevronDown
          size={14}
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {open && (
        <div
          className="absolute left-0 z-50 rounded-xl overflow-hidden"
          style={{
            top: 'calc(100% + 10px)',
            width: '220px',
            backgroundColor: '#fff',
            border: '1px solid #f0ede8',
            boxShadow: '0 12px 36px rgba(0,0,0,0.14)',
          }}
        >
          {/* Search inside dropdown */}
          <div className="p-2.5" style={{ borderBottom: '1px solid #f0ede8', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ backgroundColor: '#f9f6f3', border: '1px solid #f0ede8' }}
            >
              <Search size={13} style={{ color: '#9ca3af', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search state..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="text-sm w-full outline-none"
                style={{ background: 'transparent', border: 'none', color: '#1a1a1a' }}
                autoFocus
              />
            </div>
          </div>

          <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
            {filtered.length > 0
              ? filtered.map(state => (
                <Link
                  key={state}
                  to={`/search/?q=${encodeURIComponent(state)}&source=state`}
                  className="flex items-center px-4 py-2.5 text-sm state-option"
                  style={{ color: '#374151', textDecoration: 'none' }}
                  onClick={() => { setOpen(false); setQuery('') }}
                >
                  {state}
                </Link>
              ))
              : <p className="px-4 py-3 text-sm" style={{ color: '#9ca3af' }}>No state found</p>
            }
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── NavLink ────────────────────────────────────────────────── */
function NavLink({ to, children, onClick }) {
  const { pathname } = useLocation()
  const active = pathname === to

  return (
    <Link
      to={to}
      onClick={onClick}
      className="nav-link text-sm font-medium"
      style={{
        color: active ? 'var(--accent-color)' : 'var(--secondary-color)',
        textDecoration: 'none',
        position: 'relative',
        paddingBottom: '2px',
      }}
    >
      {children}
      {active && (
        <span
          style={{
            position: 'absolute',
            bottom: '-2px',
            left: 0,
            width: '100%',
            height: '2px',
            backgroundColor: 'var(--accent-color)',
            borderRadius: '99px',
          }}
        />
      )}
    </Link>
  )
}

/* ─── Main Header ────────────────────────────────────────────── */
export default function Header() {
  const { isLoggedIn, user } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <style>{`
        :root { --accent-color: #F1592A; }
        .nav-link { transition: color 0.15s, opacity 0.15s; }
        .nav-link:hover { color: var(--accent-color) !important; opacity: 1 !important; }
        .state-option { transition: background 0.12s; }
        .state-option:hover { background: #fdf5f2; color: #F1592A !important; }
        .mobile-menu { animation: slideDown 0.22s ease; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .header-scrolled { box-shadow: 0 2px 20px rgba(0,0,0,0.35) !important; }
      `}</style>

      <header
        className="w-full"
        style={{ backgroundColor: 'var(--black-color)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="mx-auto flex max-w-7xl h-[15vh] items-center justify-between px-4 py-3.5 sm:px-6">

          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/top_logo.jpg"
              alt="Rank Eats"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            <NavLink to="/">Home</NavLink>
            <StatesDropdown />
            <NavLink to="/for-business">For Business</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <UserMenu img={user?.avatar} />
            ) : (
              <>
                <ButtonOne title='Login' path="/login" isInverted={true} />
                <ButtonTwo title='Sign Up' path="/register" />
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(p => !p)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg"
            style={{ backgroundColor: menuOpen ? 'rgba(241,89,42,0.15)' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--secondary-color)', cursor: 'pointer', transition: 'background 0.15s' }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="mobile-menu md:hidden px-4 pb-5 pt-2 flex flex-col"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)', backgroundColor: 'var(--black-color)' }}
          >
            {/* Avatar row (if logged in) */}
            {isLoggedIn && (
              <div className="mb-3 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <UserMenu img={user?.avatar} />
              </div>
            )}

            <div className="flex flex-col" style={{ gap: '0px' }}>
              {[
                { to: '/', label: 'Home' },
                { to: '/advertise', label: 'Advertise' },
                { to: '/for-business', label: 'For Business' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="py-3 text-sm font-medium nav-link"
                  style={{
                    color: pathname === to ? 'var(--accent-color)' : 'var(--secondary-color)',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}

              {/* States in mobile */}
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <StatesDropdown mobile />
              </div>
            </div>

            {/* Mobile Auth Buttons */}
            {!isLoggedIn && (
              <div className="mt-4 flex gap-3 justify-center">
                <Btnone text="Login" path="login" />
                <Btntwo text="Sign Up" path="register" />
              </div>
            )}
          </div>
        )}
      </header>
    </>
  )
}