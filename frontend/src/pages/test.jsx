import { useState } from "react"

/* ─── Inline SVG Icons ───────────────────────────────────────── */
const Icon = ({ name, size = 20 }) => {
  const icons = {
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    mapPin: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    starEmpty: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    arrowRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
    trophy: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 21 12 17 16 21" /><line x1="12" y1="17" x2="12" y2="11" /><path d="M7 4h10v5a5 5 0 01-10 0V4z" /><path d="M17 5h2a2 2 0 012 2v2a4 4 0 01-4 4" /><path d="M7 5H5a2 2 0 00-2 2v2a4 4 0 004 4" /></svg>,
    vote: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>,
    cooking: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>,
    chevronRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
    users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
    quote: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" /></svg>,
  }
  return icons[name] || null
}

/* ─── How It Works Card ──────────────────────────────────────── */
const StepCard = ({ step, icon, title, desc }) => (
  <div
    className="flex flex-col gap-4 rounded-2xl p-6"
    style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-default)", flex: "1 1 220px" }}
  >
    <div className="flex items-center gap-3">
      <span
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: "rgba(241,89,42,0.12)", color: "var(--accent-color)" }}
      >
        <Icon name={icon} size={18} />
      </span>
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--accent-color)" }}>Step {step}</span>
    </div>
    <h3 className="text-lg font-bold exo-2" style={{ color: "var(--text-main)" }}>{title}</h3>
    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</p>
  </div>
)

/* ─── Listing Card ───────────────────────────────────────────── */
const RestaurantCard = ({ name, cuisine, location, rating, reviews, badge }) => (
  <div
    className="rounded-2xl overflow-hidden flex flex-col group"
    style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-default)", flex: "1 1 280px", maxWidth: "340px" }}
  >
    <div className="relative overflow-hidden" style={{ height: "180px", backgroundColor: "#1a1a1a" }}>
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #1a0a00 0%, #3d1f0d 50%, #1a0a00 100%)" }}
      >
        <Icon name="cooking" size={48} />
      </div>
      {badge && (
        <span
          className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-lg"
          style={{ backgroundColor: "var(--accent-color)", color: "#fff" }}
        >
          {badge}
        </span>
      )}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
        style={{ backgroundColor: "rgba(241,89,42,0.15)" }}
      >
        <span className="text-white text-sm font-semibold">View Details</span>
      </div>
    </div>
    <div className="p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-bold text-base exo-2" style={{ color: "var(--text-main)" }}>{name}</h3>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-lg shrink-0" style={{ backgroundColor: "rgba(241,89,42,0.1)", color: "var(--accent-color)" }}>{cuisine}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Icon name="mapPin" size={13} />
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{location}</span>
      </div>
      <div className="flex items-center justify-between pt-1" style={{ borderTop: "1px solid var(--border-default)" }}>
        <div className="flex items-center gap-1">
          {[1,2,3,4,5].map(i => (
            <span key={i} style={{ color: i <= Math.floor(rating) ? "#F59E0B" : "var(--border-default)" }}>
              <Icon name="star" size={12} />
            </span>
          ))}
          <span className="text-xs font-semibold ml-1" style={{ color: "var(--text-main)" }}>{rating}</span>
        </div>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{reviews} reviews</span>
      </div>
    </div>
  </div>
)

/* ─── Review Card ────────────────────────────────────────────── */
const ReviewCard = ({ author, restaurant, rating, text, avatar }) => (
  <div
    className="rounded-2xl p-5 flex flex-col gap-4"
    style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-default)", flex: "1 1 280px", maxWidth: "420px" }}
  >
    <div style={{ color: "var(--accent-color)", opacity: 0.6 }}>
      <Icon name="quote" size={20} />
    </div>
    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{text}</p>
    <div className="flex items-center gap-1 mt-auto">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= rating ? "#F59E0B" : "var(--border-default)" }}>
          <Icon name="star" size={13} />
        </span>
      ))}
    </div>
    <div className="flex items-center gap-3" style={{ borderTop: "1px solid var(--border-default)", paddingTop: "12px" }}>
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
        style={{ backgroundColor: "rgba(241,89,42,0.15)", color: "var(--accent-color)" }}
      >
        {avatar}
      </div>
      <div>
        <p className="text-sm font-semibold" style={{ color: "var(--text-main)" }}>{author}</p>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>Reviewed {restaurant}</p>
      </div>
    </div>
  </div>
)

/* ─── Section Heading ────────────────────────────────────────── */
const SectionHeading = ({ label, title }) => (
  <div className="flex flex-col items-center gap-2 text-center">
    <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(241,89,42,0.1)", color: "var(--accent-color)" }}>
      {label}
    </span>
    <h2 className="exo-2 text-3xl sm:text-5xl font-bold" style={{ color: "var(--text-main)" }}>{title}</h2>
  </div>
)

/* ─── Stat Badge ─────────────────────────────────────────────── */
const StatBadge = ({ value, label }) => (
  <div className="flex flex-col items-center gap-1">
    <span className="exo-2 text-3xl sm:text-4xl font-bold" style={{ color: "var(--accent-color)" }}>{value}</span>
    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{label}</span>
  </div>
)

/* ─── Main Home Page ─────────────────────────────────────────── */
const HomePage = () => {
  const [searchEat, setSearchEat] = useState("")
  const [searchState, setSearchState] = useState("")

  const restaurants = [
    { name: "The Flame House", cuisine: "BBQ", location: "Downtown, NYC", rating: 4.8, reviews: 312, badge: "#1 Ranked" },
    { name: "Sakura Garden", cuisine: "Japanese", location: "Midtown, NYC", rating: 4.7, reviews: 198 },
    { name: "La Bella Cucina", cuisine: "Italian", location: "Brooklyn, NYC", rating: 4.6, reviews: 274 },
    { name: "Spice Route", cuisine: "Indian", location: "Queens, NYC", rating: 4.9, reviews: 421, badge: "Hot 🔥" },
    { name: "The Burger Lab", cuisine: "American", location: "SoHo, NYC", rating: 4.5, reviews: 156 },
    { name: "Ocean's Plate", cuisine: "Seafood", location: "Battery Park, NYC", rating: 4.7, reviews: 289 },
  ]

  const reviews = [
    { author: "Sarah M.", restaurant: "The Flame House", rating: 5, text: "Absolutely incredible ribs. Found this gem through Rank Eats and it's now my go-to spot every weekend. The ranking system really works!", avatar: "SM" },
    { author: "James K.", restaurant: "Sakura Garden", rating: 5, text: "Rank Eats helped me discover restaurants I never would have found otherwise. The reviews are genuine and the ranking is trustworthy.", avatar: "JK" },
    { author: "Priya N.", restaurant: "Spice Route", rating: 4, text: "Love that I can vote for my favorite places. The community here really knows their food. Found three new favorites this month alone.", avatar: "PN" },
  ]

  return (
    <main style={{ backgroundColor: "var(--bg-page)", minHeight: "100vh", fontFamily: "inherit" }}>
      <style>{`
        :root {
          --accent-color: #F1592A;
          --accent-hover: #d94820;
          --bg-page: #0d0d0d;
          --bg-card: #141414;
          --text-main: #f0f0f0;
          --text-muted: #888;
          --border-default: #222;
          --primary-color: #F1592A;
        }
        .search-input { background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.1); color: #f0f0f0; border-radius: 10px; padding: 12px 16px; font-size: 15px; outline: none; transition: border-color 0.15s, background 0.15s; font-family: inherit; }
        .search-input::placeholder { color: rgba(255,255,255,0.3); }
        .search-input:focus { border-color: var(--accent-color); background: rgba(255,255,255,0.09); }
        .btn-primary { background: var(--accent-color); color: #fff; border: none; border-radius: 10px; padding: 12px 28px; font-size: 15px; font-weight: 700; cursor: pointer; transition: background 0.15s, transform 0.12s; font-family: inherit; }
        .btn-primary:hover { background: var(--accent-hover); transform: translateY(-1px); }
        .btn-secondary { background: transparent; color: #f0f0f0; border: 1.5px solid rgba(255,255,255,0.2); border-radius: 10px; padding: 12px 28px; font-size: 15px; font-weight: 600; cursor: pointer; transition: border-color 0.15s, background 0.15s; font-family: inherit; }
        .btn-secondary:hover { border-color: var(--accent-color); color: var(--accent-color); background: rgba(241,89,42,0.06); }
        .feature-check { display: flex; align-items: flex-start; gap: 10px; }
        .check-icon { width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; shrink: 0; background: rgba(241,89,42,0.15); color: var(--accent-color); flex-shrink: 0; margin-top: 1px; }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 gap-8 overflow-hidden"
        style={{ minHeight: "90vh", background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(241,89,42,0.25) 0%, transparent 65%), #0d0d0d" }}
      >
        {/* subtle grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px", zIndex: 0 }}
        />

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl">
          <span
            className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{ backgroundColor: "rgba(241,89,42,0.15)", color: "var(--accent-color)", border: "1px solid rgba(241,89,42,0.3)" }}
          >
            The Food Discovery Platform
          </span>

          <h1 className="exo-2 font-bold leading-tight" style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", color: "#f0f0f0" }}>
            <span style={{ color: "var(--accent-color)" }}>Rank Eats</span> — Where Every{" "}
            <span style={{ color: "#f0f0f0" }}>Bite</span> Gets{" "}
            <span style={{ color: "#f0f0f0" }}>Noticed</span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed max-w-xl" style={{ color: "var(--text-muted)" }}>
            Discover, vote, and review the best restaurants in your city. Powered by the community — not ad budgets.
          </p>

          {/* Search Bar */}
          <div
            className="w-full max-w-2xl rounded-2xl p-3 flex flex-col sm:flex-row gap-2"
            style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="flex items-center gap-2 flex-1" style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "10px", padding: "0 14px" }}>
              <Icon name="search" size={16} />
              <input
                className="search-input flex-1"
                style={{ background: "transparent", border: "none", padding: "12px 4px" }}
                value={searchEat}
                onChange={e => setSearchEat(e.target.value)}
                placeholder="Pizza, steaks, ramen..."
              />
            </div>
            <div className="flex items-center gap-2 flex-1" style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "10px", padding: "0 14px" }}>
              <Icon name="mapPin" size={16} />
              <input
                className="search-input flex-1"
                style={{ background: "transparent", border: "none", padding: "12px 4px" }}
                value={searchState}
                onChange={e => setSearchState(e.target.value)}
                placeholder="City or state..."
              />
            </div>
            <button className="btn-primary shrink-0 flex items-center gap-2">
              <Icon name="search" size={15} />
              <span>Search</span>
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button className="btn-secondary">Browse Restaurants</button>
            <button className="btn-primary flex items-center gap-2">
              <Icon name="trophy" size={15} />
              Top Ranked Eats
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="relative z-10 flex flex-wrap justify-center gap-10 sm:gap-16 px-8 py-6 rounded-2xl"
          style={{ backgroundColor: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <StatBadge value="12K+" label="Restaurants" />
          <StatBadge value="480K+" label="Reviews" />
          <StatBadge value="95K+" label="Monthly Voters" />
          <StatBadge value="50+" label="Cities" />
        </div>
      </section>

      {/* ── WELCOME BANNER ────────────────────────────────────── */}
      <section
        className="px-4 py-16"
        style={{ backgroundColor: "var(--accent-color)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-8">
          <h2 className="exo-2 font-bold text-3xl sm:text-5xl text-white w-full sm:w-[44%] leading-tight">
            Find The Best.<br />Eat The Best.
          </h2>
          <div className="w-full sm:w-[52%] flex flex-col gap-4">
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
              Rank Eats puts real community votes at the center of every restaurant ranking. No pay-to-win listings — just honest reviews from people who actually ate there.
            </p>
            <button
              className="self-start flex items-center gap-2 font-bold text-sm px-5 py-3 rounded-xl"
              style={{ backgroundColor: "#0d0d0d", color: "#f0f0f0", border: "none", cursor: "pointer" }}
            >
              Learn how it works <Icon name="arrowRight" size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ── ABOUT / FEATURES ──────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20 flex flex-col sm:flex-row gap-12 sm:gap-16 items-center">
        {/* Visual side */}
        <div className="relative w-full sm:w-1/2 flex-shrink-0" style={{ minHeight: "340px" }}>
          <div
            className="rounded-2xl w-full"
            style={{ height: "320px", backgroundColor: "#1a1a1a", border: "1px solid var(--border-default)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
          >
            <div style={{ color: "rgba(241,89,42,0.2)", transform: "scale(4)" }}>
              <Icon name="trophy" size={48} />
            </div>
          </div>
          <div
            className="absolute rounded-xl p-4 flex flex-col gap-1"
            style={{ bottom: "-16px", right: "-12px", backgroundColor: "var(--accent-color)", minWidth: "160px", boxShadow: "0 8px 24px rgba(241,89,42,0.35)" }}
          >
            <span className="text-white font-bold exo-2 text-2xl">4.9 ★</span>
            <span className="text-white text-xs font-semibold opacity-80">Community Trust Score</span>
          </div>
        </div>

        {/* Text side */}
        <div className="w-full sm:w-1/2 flex flex-col gap-6">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full self-start" style={{ backgroundColor: "rgba(241,89,42,0.1)", color: "var(--accent-color)" }}>
            About Rank Eats
          </span>
          <h2 className="exo-2 font-bold text-3xl sm:text-4xl leading-snug" style={{ color: "var(--text-main)" }}>
            Visibility Earned, Not Bought
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Rank Eats is built on a simple belief: the best restaurants should rise to the top because of what's on the plate — not what's in the marketing budget. Our community of food lovers votes, reviews, and ranks every listing.
          </p>

          <div className="flex flex-col gap-3">
            {[
              "Community-driven rankings, updated in real time",
              "Verified restaurant listings with honest reviews",
              "Vote for your favorites and shape what gets discovered",
              "Completely free basic listings for every restaurant",
            ].map((item, i) => (
              <div key={i} className="feature-check">
                <span className="check-icon"><Icon name="check" size={11} /></span>
                <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item}</span>
              </div>
            ))}
          </div>

          <button className="btn-primary self-start flex items-center gap-2">
            Our Story <Icon name="arrowRight" size={15} />
          </button>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="px-4 py-20" style={{ backgroundColor: "#111" }}>
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <SectionHeading label="The Process" title="How It Works" />
          <div className="flex flex-wrap gap-4 justify-center">
            <StepCard step={1} icon="search" title="Search Eats" desc="Type any food, cuisine, or restaurant name and narrow it down by city or state." />
            <StepCard step={2} icon="star" title="Read Reviews" desc="Browse real community reviews with verified ratings from actual diners." />
            <StepCard step={3} icon="vote" title="Cast Your Vote" desc="Vote for your favorite spots and help push the best restaurants to the top of the list." />
            <StepCard step={4} icon="cooking" title="Enjoy the Best" desc="Discover new places with confidence — ranked by people who genuinely love food." />
          </div>
        </div>
      </section>

      {/* ── TOP RANKED RESTAURANTS ────────────────────────────── */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <SectionHeading label="Community Favorites" title="Best Restaurants" />
            <button className="btn-secondary self-center sm:self-auto flex items-center gap-2 shrink-0">
              View All <Icon name="chevronRight" size={15} />
            </button>
          </div>
          <div className="flex flex-wrap gap-5 justify-center">
            {restaurants.map((r, i) => (
              <RestaurantCard key={i} {...r} />
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST REVIEWS ────────────────────────────────────── */}
      <section className="px-4 py-20" style={{ backgroundColor: "#111" }}>
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <SectionHeading label="What People Are Saying" title="Latest Reviews" />
            <button className="btn-secondary self-center sm:self-auto flex items-center gap-2 shrink-0">
              All Reviews <Icon name="chevronRight" size={15} />
            </button>
          </div>
          <div className="flex flex-wrap gap-5 justify-center">
            {reviews.map((r, i) => (
              <ReviewCard key={i} {...r} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FOOTER BANNER ─────────────────────────────────── */}
      <section
        className="px-4 py-20 text-center flex flex-col items-center gap-6"
        style={{ background: "radial-gradient(ellipse 70% 80% at 50% 100%, rgba(241,89,42,0.2) 0%, transparent 70%), #0d0d0d" }}
      >
        <h2 className="exo-2 font-bold text-3xl sm:text-5xl" style={{ color: "#f0f0f0" }}>
          Own a Restaurant?
        </h2>
        <p className="text-base max-w-md leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Get your restaurant listed on Rank Eats for free. Gain visibility, collect reviews, and let the community discover you.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button className="btn-primary flex items-center gap-2">
            <Icon name="users" size={16} />
            Add Your Restaurant
          </button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </section>
    </main>
  )
}

export default HomePage