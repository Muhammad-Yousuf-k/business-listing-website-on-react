// src/components/Footer.jsx

import { Link } from "react-router-dom"
import { useState } from "react"
import Icon from "../components/Icon"
import { useContent } from "../hooks/useContent"
import { useUser } from "../hooks/useUser"


/* ─── Footer Link ────────────────────────────────────────────── */
const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="footer-link text-sm"
    style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.15s" }}
  >
    {children}
  </Link>
)

/* ─── Social Button ──────────────────────────────────────────── */
const SocialBtn = ({ name, href, label }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noreferrer"
    className="social-btn w-9 h-9 rounded-xl flex items-center justify-center"
    style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#9ca3af", transition: "background 0.15s, color 0.15s" }}
  >
    <Icon name={name} size={16} />
  </a>
)

/* ─── Newsletter ─────────────────────────────────────────────── */
const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle") // idle | success | error
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error"); return
    }
    setLoading(true)
    setTimeout(() => { setLoading(false); setStatus("success"); setEmail("") }, 1200)
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6b7280" }}>Newsletter</p>
      <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>
        Get the best new restaurants and trending eats delivered to your inbox weekly.
      </p>

      {status === "success" ? (
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold"
          style={{ backgroundColor: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}
        >
          <Icon name="star" size={14} />
          You're subscribed. Thanks!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); if (status === "error") setStatus("idle") }}
              placeholder="your@email.com"
              className="newsletter-input flex-1 px-3.5 py-2.5 rounded-xl text-sm outline-none"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: `1.5px solid ${status === "error" ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
                color: "#f0f0f0",
                fontFamily: "inherit",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center px-4 py-2.5 rounded-xl shrink-0"
              style={{ backgroundColor: "#F1592A", border: "none", cursor: loading ? "not-allowed" : "pointer", color: "#fff", transition: "background 0.15s", opacity: loading ? 0.8 : 1 }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = "#d94820" }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = "#F1592A" }}
            >
              {loading
                ? <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                : <Icon name="arrowRight" size={16} />
              }
            </button>
          </div>
          {status === "error" && (
            <p className="text-xs" style={{ color: "#ef4444" }}>Please enter a valid email address.</p>
          )}
        </form>
      )}
    </div>
  )
}

/* ─── Scroll to Top ──────────────────────────────────────────── */
const ScrollTop = () => (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="scroll-top-btn w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
    style={{ backgroundColor: "rgba(241,89,42,0.15)", border: "1px solid rgba(241,89,42,0.3)", color: "#F1592A", cursor: "pointer", transition: "background 0.15s" }}
    aria-label="Scroll to top"
    onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(241,89,42,0.3)"}
    onMouseLeave={e => e.currentTarget.style.backgroundColor = "rgba(241,89,42,0.15)"}
  >
    <Icon name="chevronUp" size={16} />
  </button>
)

/* ─── Main Footer ────────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear()
  const { TopStates, footerPackage } = useContent()
  const { userRole } = useUser()

  return (
    <footer style={{ backgroundColor: "var(--black-color, #0d0d0d)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <style>{`
        .footer-link:hover { color: #F1592A !important; }
        .social-btn:hover { background: rgba(241,89,42,0.18) !important; color: #F1592A !important; border-color: rgba(241,89,42,0.3) !important; }
        .newsletter-input::placeholder { color: #4b5563; }
        .newsletter-input:focus { border-color: #F1592A !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* ── Main grid ────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column — spans 2 on large */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Logo */}
            <Link to="/">
              <img src="/top_logo.jpg" alt="Rank Eats" className="h-10 w-auto object-contain" />
            </Link>

            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#9ca3af" }}>
              Rank Eats is the community-powered food discovery platform. Find the best restaurants near you, ranked by real diners — not ad budgets.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@rankeats.com" className="footer-link flex items-center gap-2.5 text-sm" style={{ color: "#9ca3af", textDecoration: "none" }}>
                <Icon name="mail" size={14} />
                {footerPackage?.contactInfo?.email}
              </a>
              <a href="tel:+14158824400" className="footer-link flex items-center gap-2.5 text-sm" style={{ color: "#9ca3af", textDecoration: "none" }}>
                <Icon name="phone" size={14} />
                {footerPackage?.contactInfo?.tel}
              </a>
              <div className="flex items-center gap-2.5 text-sm" style={{ color: "#9ca3af" }}>
                <Icon name="mapPin" size={14} />
                {footerPackage?.contactInfo?.address}
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {footerPackage?.socialLink?.map(s => <SocialBtn key={s.name} {...s} />)}
            </div>

          </div>

          {/* Nav columns */}
          {footerPackage?.navColLink?.map(col => {
            if (userRole === "viewer" && col.heading == "Business") {
              return
            }
            return (<div key={col.heading} className="flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6b7280" }}>{col.heading}</p>
              <ul className="flex flex-col gap-3 list-none p-0 m-0">
                {col.links.map(link => (
                  <li key={link.to}>
                    <FooterLink to={link.to}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>)
          })}
        </div>

        {/* ── Browse by State ───────────────────────────────── */}
        <div
          className="mt-12 pt-8 flex flex-col gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6b7280" }}>
            Popular States
          </p>
          <div className="flex flex-wrap gap-2">
            {footerPackage?.TopStates?.map(state => (
              <Link
                key={state}
                to={`/search/?state=${encodeURIComponent(state)}&source=state`}
                className="text-xs font-medium px-3 py-1.5 rounded-full state-pill"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "#9ca3af", textDecoration: "none", transition: "background 0.15s, color 0.15s, border-color 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(241,89,42,0.12)"; e.currentTarget.style.color = "#F1592A"; e.currentTarget.style.borderColor = "rgba(241,89,42,0.3)" }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)" }}
              >
                {state}
              </Link>
            ))}
            <Link
              to="/search?source=state"
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ backgroundColor: "rgba(241,89,42,0.1)", border: "1px solid rgba(241,89,42,0.25)", color: "#F1592A", textDecoration: "none" }}
            >
              View all states →
            </Link>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────── */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="text-xs text-center sm:text-left" style={{ color: "#4b5563" }}>
            © {year} Rank Eats. All rights reserved. Built for food lovers, by food lovers.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {[
                { label: "Privacy", to: "/privacy" },
                { label: "Terms", to: "/terms" },
                { label: "Cookies", to: "/cookies" },
              ].map(l => (
                <Link key={l.to} to={l.to} className="footer-link text-xs" style={{ color: "#4b5563", textDecoration: "none" }}>
                  {l.label}
                </Link>
              ))}
            </div>
            <ScrollTop />
          </div>
        </div>
      </div>
    </footer>
  )
}