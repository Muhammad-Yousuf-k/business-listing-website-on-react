import { useState } from "react"

/* ─── Icons ──────────────────────────────────────────────────── */
const Icon = ({ name, size = 20 }) => {
  const icons = {
    eye: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    trendingUp: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
    target: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    arrowRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    zap: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    barChart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    mapPin: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    layout: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
    dollarSign: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
    playCircle: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>,
  }
  return icons[name] || null
}

/* ─── Pill Tag ───────────────────────────────────────────────── */
const Pill = ({ children }) => (
  <span
    className="inline-flex items-center text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
    style={{ backgroundColor: "rgba(241,89,42,0.1)", color: "#F1592A", border: "1px solid rgba(241,89,42,0.2)" }}
  >
    {children}
  </span>
)

/* ─── Goal Card ──────────────────────────────────────────────── */
const GoalCard = ({ icon, title, desc, color }) => (
  <div
    className="flex flex-col gap-4 rounded-2xl p-7 group"
    style={{ backgroundColor: "#fff", border: "1.5px solid #f0ede8", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", transition: "box-shadow 0.2s, transform 0.2s", cursor: "default" }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(241,89,42,0.12)"; e.currentTarget.style.transform = "translateY(-3px)" }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "translateY(0)" }}
  >
    <span
      className="w-12 h-12 rounded-xl flex items-center justify-center"
      style={{ backgroundColor: color + "14", color }}
    >
      <Icon name={icon} size={22} />
    </span>
    <h3 className="exo-2 text-xl font-bold" style={{ color: "#1a1a1a" }}>{title}</h3>
    <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{desc}</p>
  </div>
)

/* ─── Stat Block ─────────────────────────────────────────────── */
const StatBlock = ({ value, label, sub }) => (
  <div className="flex flex-col items-center gap-1 text-center">
    <span className="exo-2 font-bold" style={{ fontSize: "2.8rem", color: "#F1592A", lineHeight: 1 }}>{value}</span>
    <span className="font-semibold text-sm" style={{ color: "#1a1a1a" }}>{label}</span>
    {sub && <span className="text-xs" style={{ color: "#9ca3af" }}>{sub}</span>}
  </div>
)

/* ─── Feature Row ────────────────────────────────────────────── */
const FeatureRow = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4">
    <span
      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
      style={{ backgroundColor: "rgba(241,89,42,0.1)", color: "#F1592A" }}
    >
      <Icon name={icon} size={16} />
    </span>
    <div>
      <p className="font-bold text-sm mb-0.5" style={{ color: "#1a1a1a" }}>{title}</p>
      <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{desc}</p>
    </div>
  </div>
)

/* ─── Ad Placement Preview ───────────────────────────────────── */
const AdPreview = ({ type, label }) => (
  <div
    className="rounded-xl overflow-hidden"
    style={{ border: "1.5px solid #f0ede8", backgroundColor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
  >
    <div
      className="flex items-center justify-between px-4 py-2.5"
      style={{ backgroundColor: "#fdf5f2", borderBottom: "1px solid #f0ede8" }}
    >
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: "#F1592A", color: "#fff" }}>Sponsored</span>
        <span className="text-xs font-semibold" style={{ color: "#1a1a1a" }}>{label}</span>
      </div>
      <Icon name="layout" size={14} />
    </div>
    <div className="p-4 flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: "#fde8e0" }} />
        <div className="flex flex-col gap-1 flex-1">
          <div className="h-3 rounded" style={{ backgroundColor: "#f3f4f6", width: "60%" }} />
          <div className="h-2.5 rounded" style={{ backgroundColor: "#f3f4f6", width: "40%" }} />
        </div>
        <div className="flex items-center gap-0.5" style={{ color: "#F59E0B" }}>
          {[1,2,3,4,5].map(i => <Icon key={i} name="star" size={10} />)}
        </div>
      </div>
      {type === "card" && (
        <>
          <div className="h-2 rounded" style={{ backgroundColor: "#f3f4f6", width: "80%" }} />
          <div className="h-2 rounded" style={{ backgroundColor: "#f3f4f6", width: "55%" }} />
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1" style={{ color: "#6b7280" }}>
              <Icon name="mapPin" size={10} />
              <div className="h-2 w-16 rounded" style={{ backgroundColor: "#f3f4f6" }} />
            </div>
          </div>
        </>
      )}
    </div>
  </div>
)

/* ─── Pricing Card ───────────────────────────────────────────── */
const PricingCard = ({ name, price, period, features, highlight, badge }) => (
  <div
    className="flex flex-col rounded-2xl p-7 relative"
    style={{
      backgroundColor: highlight ? "#F1592A" : "#fff",
      border: highlight ? "none" : "1.5px solid #f0ede8",
      boxShadow: highlight ? "0 16px 48px rgba(241,89,42,0.28)" : "0 2px 12px rgba(0,0,0,0.05)",
      flex: "1 1 240px",
      maxWidth: "320px",
    }}
  >
    {badge && (
      <span
        className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full"
        style={{ backgroundColor: "#1a1a1a", color: "#fff" }}
      >
        {badge}
      </span>
    )}
    <div className="flex flex-col gap-1 mb-6">
      <span className="text-sm font-bold uppercase tracking-wider" style={{ color: highlight ? "rgba(255,255,255,0.7)" : "#9ca3af" }}>{name}</span>
      <div className="flex items-baseline gap-1">
        <span className="exo-2 font-bold" style={{ fontSize: "2.4rem", color: highlight ? "#fff" : "#1a1a1a" }}>{price}</span>
        {period && <span className="text-sm" style={{ color: highlight ? "rgba(255,255,255,0.6)" : "#9ca3af" }}>{period}</span>}
      </div>
    </div>
    <div className="flex flex-col gap-3 flex-1">
      {features.map((f, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: highlight ? "rgba(255,255,255,0.2)" : "rgba(241,89,42,0.1)", color: highlight ? "#fff" : "#F1592A" }}
          >
            <Icon name="check" size={10} />
          </span>
          <span className="text-sm" style={{ color: highlight ? "rgba(255,255,255,0.88)" : "#4b5563" }}>{f}</span>
        </div>
      ))}
    </div>
    <button
      className="mt-8 w-full py-3 rounded-xl text-sm font-bold transition-all duration-150"
      style={{
        backgroundColor: highlight ? "#fff" : "#F1592A",
        color: highlight ? "#F1592A" : "#fff",
        border: "none",
        cursor: "pointer",
      }}
      onMouseEnter={e => { if (!highlight) e.currentTarget.style.backgroundColor = "#d94820"; else e.currentTarget.style.backgroundColor = "#fdf5f2" }}
      onMouseLeave={e => { if (!highlight) e.currentTarget.style.backgroundColor = "#F1592A"; else e.currentTarget.style.backgroundColor = "#fff" }}
    >
      Get Started
    </button>
  </div>
)

/* ─── Testimonial Card ───────────────────────────────────────── */
const Testimonial = ({ quote, author, role, rating }) => (
  <div
    className="flex flex-col gap-4 rounded-2xl p-6"
    style={{ backgroundColor: "#fff", border: "1.5px solid #f0ede8", flex: "1 1 260px", maxWidth: "380px" }}
  >
    <div className="flex items-center gap-1" style={{ color: "#F59E0B" }}>
      {[1,2,3,4,5].map(i => <Icon key={i} name="star" size={14} />)}
    </div>
    <p className="text-sm leading-relaxed" style={{ color: "#4b5563" }}>"{quote}"</p>
    <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid #f0ede8" }}>
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
        style={{ backgroundColor: "rgba(241,89,42,0.12)", color: "#F1592A" }}
      >
        {author.split(" ").map(n => n[0]).join("")}
      </div>
      <div>
        <p className="text-sm font-bold" style={{ color: "#1a1a1a" }}>{author}</p>
        <p className="text-xs" style={{ color: "#9ca3af" }}>{role}</p>
      </div>
    </div>
  </div>
)

/* ─── FAQ Accordion ──────────────────────────────────────────── */
const FAQ = ({ q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-xl overflow-hidden cursor-pointer"
      style={{ border: `1.5px solid ${open ? "#F1592A" : "#f0ede8"}`, transition: "border-color 0.15s" }}
      onClick={() => setOpen(p => !p)}
    >
      <div className="flex items-center justify-between p-5 gap-3">
        <p className="font-semibold text-sm" style={{ color: "#1a1a1a" }}>{q}</p>
        <span
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200"
          style={{ backgroundColor: open ? "#F1592A" : "#f9f6f3", color: open ? "#fff" : "#9ca3af", transform: open ? "rotate(90deg)" : "none" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </span>
      </div>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{a}</p>
        </div>
      )}
    </div>
  )
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function AdvertisePage() {
  return (
    <div style={{ backgroundColor: "#faf8f5", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Sora:wght@700;800&display=swap');
        .exo-2 { font-family: 'Sora', sans-serif; }
        .btn-cta { background: #F1592A; color: #fff; border: none; border-radius: 12px; padding: 14px 32px; font-size: 15px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: background 0.15s, transform 0.12s, box-shadow 0.15s; font-family: 'DM Sans', sans-serif; }
        .btn-cta:hover { background: #d94820; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(241,89,42,0.3); }
        .btn-outline { background: transparent; color: #F1592A; border: 1.5px solid #F1592A; border-radius: 12px; padding: 14px 32px; font-size: 15px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: background 0.15s, color 0.15s; font-family: 'DM Sans', sans-serif; }
        .btn-outline:hover { background: rgba(241,89,42,0.06); }
        .section-divider { width: 48px; height: 3px; background: #F1592A; border-radius: 99px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.6s ease both; }
        .fade-up-1 { animation-delay: 0.05s; }
        .fade-up-2 { animation-delay: 0.15s; }
        .fade-up-3 { animation-delay: 0.25s; }
        .fade-up-4 { animation-delay: 0.35s; }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-4 pt-24 pb-20 flex flex-col items-center text-center gap-8"
        style={{ background: "linear-gradient(160deg, #fff 0%, #fdf5f2 55%, #fde8de 100%)" }}
      >
        {/* decorative rings */}
        <div className="absolute pointer-events-none" style={{ width: "700px", height: "700px", borderRadius: "50%", border: "1px solid rgba(241,89,42,0.08)", top: "-200px", left: "50%", transform: "translateX(-50%)" }} />
        <div className="absolute pointer-events-none" style={{ width: "500px", height: "500px", borderRadius: "50%", border: "1px solid rgba(241,89,42,0.1)", top: "-120px", left: "50%", transform: "translateX(-50%)" }} />

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
          <Pill>Advertising</Pill>

          <h1 className="exo-2 font-bold fade-up fade-up-1" style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", color: "#1a1a1a", lineHeight: 1.1 }}>
            Advertise on{" "}
            <span style={{ color: "#F1592A" }}>Rank Eats</span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed max-w-xl fade-up fade-up-2" style={{ color: "#6b7280" }}>
            Increase visibility and sales with sponsored ads that put your restaurant in front of customers who are already hungry and ready to order.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-2 fade-up fade-up-3">
            {[
              { icon: "trendingUp", text: "Improve your business" },
              { icon: "target", text: "Know your customers" },
              { icon: "users", text: "Reach new customers" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: "#fff", border: "1px solid #f0ede8", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <span style={{ color: "#F1592A" }}><Icon name={item.icon} size={15} /></span>
                <span className="text-sm font-semibold" style={{ color: "#374151" }}>{item.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center fade-up fade-up-4">
            <button className="btn-cta">
              Start Advertising <Icon name="arrowRight" size={16} />
            </button>
            <button className="btn-outline">
              <Icon name="playCircle" size={16} />
              See How It Works
            </button>
          </div>
        </div>

        {/* Hero visual — mock ad placement */}
        <div
          className="relative z-10 w-full max-w-2xl rounded-2xl overflow-hidden fade-up fade-up-4"
          style={{ backgroundColor: "#fff", border: "1.5px solid #f0ede8", boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}
        >
          {/* browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3" style={{ backgroundColor: "#f9f6f3", borderBottom: "1px solid #f0ede8" }}>
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#fca5a5" }} />
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#fcd34d" }} />
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#86efac" }} />
            <div className="flex-1 ml-3 flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", maxWidth: "280px" }}>
              <Icon name="search" size={12} />
              <span className="text-xs" style={{ color: "#9ca3af" }}>best pizza near me</span>
            </div>
          </div>
          {/* search results with sponsored */}
          <div className="p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 pb-2" style={{ borderBottom: "1px solid #f0ede8" }}>
              <span className="text-xs font-semibold" style={{ color: "#9ca3af" }}>Showing results for</span>
              <span className="text-xs font-bold" style={{ color: "#1a1a1a" }}>"best pizza near me"</span>
            </div>
            {/* Sponsored result */}
            <div className="rounded-xl p-4 flex items-center gap-4" style={{ backgroundColor: "#fdf5f2", border: "1.5px solid #fbd5c4" }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#F1592A" }}>
                <Icon name="star" size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-bold" style={{ color: "#1a1a1a" }}>Mario's Authentic Pizza</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: "#F1592A", color: "#fff" }}>Ad</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: "#9ca3af" }}>⭐ 4.9 · 312 reviews · Italian · Downtown</span>
                </div>
              </div>
              <button className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ backgroundColor: "#F1592A", color: "#fff", border: "none", cursor: "pointer" }}>View</button>
            </div>
            {/* organic results */}
            {[
              { name: "Slice & Dice", rating: "4.6", reviews: "188" },
              { name: "The Crust Factory", rating: "4.4", reviews: "97" },
            ].map((r, i) => (
              <div key={i} className="rounded-xl p-4 flex items-center gap-4" style={{ backgroundColor: "#fff", border: "1px solid #f0ede8" }}>
                <div className="w-12 h-12 rounded-lg shrink-0" style={{ backgroundColor: "#f3f4f6" }} />
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-0.5" style={{ color: "#1a1a1a" }}>{r.name}</p>
                  <p className="text-xs" style={{ color: "#9ca3af" }}>⭐ {r.rating} · {r.reviews} reviews · Pizza</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#fff", borderTop: "1px solid #f0ede8", borderBottom: "1px solid #f0ede8" }}>
        <div
          className="max-w-5xl mx-auto px-4 py-10 flex flex-wrap justify-center gap-10 sm:gap-20"
        >
          <StatBlock value="3X" label="More Customer Reach" sub="vs. non-advertised listings" />
          <StatBlock value="95K+" label="Monthly Active Users" sub="hungry and ready to order" />
          <StatBlock value="12K+" label="Restaurant Listings" sub="across 50+ cities" />
          <StatBlock value="480K+" label="Reviews Generated" sub="from verified diners" />
        </div>
      </section>

      {/* ── ACHIEVE YOUR GOALS ───────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20 flex flex-col gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <Pill>Why Advertise</Pill>
          <h2 className="exo-2 font-bold text-3xl sm:text-5xl" style={{ color: "#1a1a1a" }}>Achieve Your Business Goals</h2>
          <p className="text-base max-w-lg leading-relaxed" style={{ color: "#6b7280" }}>
            Rank Eats Ads are built for restaurants — designed to connect you with people who are actively searching for a place to eat right now.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <GoalCard
            icon="eye"
            title="Get Discovered"
            desc="Advertising provides a powerful visibility boost. Ads appear on the homepage, search results, and category pages — putting your restaurant where eyes already are."
            color="#F1592A"
          />
          <GoalCard
            icon="trendingUp"
            title="Increase Sales"
            desc="Many people visit Rank Eats already hungry and ready to order. Advertising connects you with these high-intent customers at exactly the right moment."
            color="#10b981"
          />
          <GoalCard
            icon="target"
            title="Know Your Customers"
            desc="Get detailed analytics on who's viewing and clicking your ads — location, cuisine preferences, and peak search times — so you can make smarter decisions."
            color="#3b82f6"
          />
          <GoalCard
            icon="barChart"
            title="Track Every Result"
            desc="Your advertising dashboard shows real-time impressions, clicks, and conversion data. No guesswork — just clear numbers tied to your spend."
            color="#8b5cf6"
          />
          <GoalCard
            icon="shield"
            title="Build Trust"
            desc="Sponsored listings still carry your real reviews and rating. Advertising amplifies your reputation — it doesn't replace it."
            color="#f59e0b"
          />
          <GoalCard
            icon="zap"
            title="Launch in Minutes"
            desc="Set up your first ad campaign in under 5 minutes. No agency needed, no complex setup — just choose your budget, area, and go."
            color="#ef4444"
          />
        </div>
      </section>

      {/* ── HOW PLACEMENT WORKS ──────────────────────────────── */}
      <section style={{ backgroundColor: "#fff", borderTop: "1px solid #f0ede8", borderBottom: "1px solid #f0ede8" }}>
        <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col lg:flex-row gap-14 items-center">
          {/* Text */}
          <div className="flex flex-col gap-7 w-full lg:w-1/2">
            <Pill>Ad Placement</Pill>
            <h2 className="exo-2 font-bold text-3xl sm:text-4xl leading-snug" style={{ color: "#1a1a1a" }}>
              Rank Eats Ads puts you{" "}
              <span style={{ color: "#F1592A" }}>above the competition</span>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
              Rank Eats Ads puts your business above the search results and at the top of pages throughout the website. Customers are more likely to find you before your competitors while searching for the food you serve.
            </p>

            <div className="flex flex-col gap-5">
              <FeatureRow icon="search" title="Search Result Priority" desc="Your listing appears at the very top of relevant search queries before any organic results." />
              <FeatureRow icon="layout" title="Homepage Placement" desc="Featured ad spots on the Rank Eats homepage — the first thing visitors see when they land." />
              <FeatureRow icon="mapPin" title="Location-Based Targeting" desc="Only show your ads to users searching in your city or within a custom radius of your restaurant." />
              <FeatureRow icon="dollarSign" title="Flexible Budgets" desc="Set a daily or monthly budget that works for your business. Pause or adjust anytime with no penalty." />
            </div>

            <div
              className="flex items-center gap-5 rounded-xl p-5"
              style={{ backgroundColor: "#fdf5f2", border: "1.5px solid rgba(241,89,42,0.2)" }}
            >
              <span className="exo-2 font-bold text-4xl shrink-0" style={{ color: "#F1592A" }}>3X</span>
              <p className="text-sm leading-relaxed font-semibold" style={{ color: "#374151" }}>
                Reach 3X more customers with Rank Eats Ads — based on average performance across advertised listings vs. non-advertised.
              </p>
            </div>

            <button className="btn-cta self-start">
              Start Advertising <Icon name="arrowRight" size={16} />
            </button>
          </div>

          {/* Visual */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#9ca3af" }}>Where your ad appears</p>
            <AdPreview type="card" label="Homepage Feature" />
            <AdPreview type="search" label="Search Results" />
            <div
              className="rounded-xl p-4 flex items-center gap-3"
              style={{ backgroundColor: "#f9f6f3", border: "1px dashed #ddd8d0" }}
            >
              <span style={{ color: "#F1592A" }}><Icon name="layout" size={18} /></span>
              <span className="text-sm" style={{ color: "#9ca3af" }}>+ Category pages, nearby restaurant feeds, and more</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20 flex flex-col gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <Pill>Pricing</Pill>
          <h2 className="exo-2 font-bold text-3xl sm:text-5xl" style={{ color: "#1a1a1a" }}>Simple, Honest Pricing</h2>
          <p className="text-base max-w-md leading-relaxed" style={{ color: "#6b7280" }}>
            No hidden fees. No long-term contracts. Start with the plan that fits your restaurant and upgrade anytime.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <PricingCard
            name="Starter"
            price="$49"
            period="/mo"
            features={[
              "Search result placement",
              "Up to 500 impressions/mo",
              "Basic analytics dashboard",
              "1 active ad campaign",
              "Email support",
            ]}
          />
          <PricingCard
            name="Growth"
            price="$129"
            period="/mo"
            highlight
            badge="Most Popular"
            features={[
              "Homepage + search placement",
              "Up to 2,500 impressions/mo",
              "Advanced analytics & insights",
              "3 active ad campaigns",
              "Location radius targeting",
              "Priority support",
            ]}
          />
          <PricingCard
            name="Pro"
            price="$299"
            period="/mo"
            features={[
              "All placements across the site",
              "Unlimited impressions",
              "Full analytics suite",
              "Unlimited campaigns",
              "Custom audience targeting",
              "Dedicated account manager",
            ]}
          />
        </div>

        <p className="text-center text-sm" style={{ color: "#9ca3af" }}>
          All plans include a 14-day free trial. No credit card required to start.
        </p>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section style={{ backgroundColor: "#fff", borderTop: "1px solid #f0ede8" }}>
        <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col gap-12">
          <div className="flex flex-col items-center gap-3 text-center">
            <Pill>Success Stories</Pill>
            <h2 className="exo-2 font-bold text-3xl sm:text-4xl" style={{ color: "#1a1a1a" }}>What Advertisers Say</h2>
          </div>
          <div className="flex flex-wrap gap-5 justify-center">
            <Testimonial
              quote="Within two weeks of running Rank Eats Ads, we saw a 40% increase in table reservations. The targeting is incredibly precise — we were only reaching people in our neighborhood."
              author="Marco Ricci"
              role="Owner, La Bella Cucina"
            />
            <Testimonial
              quote="The advertising is an essential part of our growth strategy. Rank Eats puts us in front of customers who are actually looking for what we serve, not just browsing."
              author="Ananya Patel"
              role="Manager, Spice Route"
            />
            <Testimonial
              quote="Best marketing spend we've made. The dashboard shows exactly where customers are coming from and the ROI has been clear from month one."
              author="David Chen"
              role="Owner, The Flame House"
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-20 flex flex-col gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <Pill>FAQ</Pill>
          <h2 className="exo-2 font-bold text-3xl sm:text-4xl" style={{ color: "#1a1a1a" }}>Common Questions</h2>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { q: "How quickly will my ad go live?", a: "After submitting your ad and completing payment, your campaign typically goes live within 2–4 hours. Our team reviews all ads to ensure they meet our quality guidelines before approval." },
            { q: "Can I pause or cancel my ads at any time?", a: "Yes, absolutely. You can pause, edit, or cancel any campaign from your advertiser dashboard with no cancellation fees or penalties. Monthly plans are billed at the start of each period." },
            { q: "What kind of businesses can advertise on Rank Eats?", a: "Rank Eats advertising is available to restaurants, cafes, food trucks, cloud kitchens, and any food-and-beverage business with a verified listing on our platform." },
            { q: "How is my ad budget charged?", a: "You set a daily or monthly budget cap, and you are only charged for actual impressions or clicks depending on your plan type. You will never be billed beyond your stated cap." },
            { q: "Is there a minimum commitment?", a: "No minimum commitment. All plans are month-to-month and you can start with the 14-day free trial on any paid plan with no credit card required upfront." },
          ].map((item, i) => <FAQ key={i} q={item.q} a={item.a} />)}
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section
        className="px-4 py-20 flex flex-col items-center text-center gap-6"
        style={{ background: "linear-gradient(135deg, #F1592A 0%, #c94018 100%)" }}
      >
        <h2 className="exo-2 font-bold text-3xl sm:text-5xl text-white max-w-2xl leading-tight">
          Ready to Reach More Customers?
        </h2>
        <p className="text-base max-w-md leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
          Advertising is an essential part of every restaurant's growth strategy. Start your free trial today — no commitment required.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            className="btn-cta"
            style={{ backgroundColor: "#fff", color: "#F1592A" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#fdf5f2" }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#fff" }}
          >
            Start Advertising <Icon name="arrowRight" size={16} />
          </button>
          <button
            className="btn-outline"
            style={{ borderColor: "rgba(255,255,255,0.5)", color: "#fff" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)" }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent" }}
          >
            Talk to Sales
          </button>
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>14-day free trial · No credit card required · Cancel anytime</p>
      </section>
    </div>
  )
}
