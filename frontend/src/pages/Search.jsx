import { useEffect, useState } from 'react'
import CommonHeroSec from "../components/CommonHeroSec"
import { useLocation } from "react-router-dom"
import { useRestaurant } from "../hooks/useRestaurant"

/* ─── Icons ──────────────────────────────────────────────────── */
const Icon = ({ name, size = 18 }) => {
  const icons = {
    grid: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
    list: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    mapPin: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    chevronDown: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    utensils: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="2" x2="3" y2="22"/><path d="M7 2v6c0 1.1-.9 2-2 2H3"/><path d="M7 2c0 0 4 2 4 6s-4 6-4 6"/><path d="M21 15V2"/><path d="M18 2v6"/><path d="M15 2v6"/><path d="M15 10c0 0 1 0 3 2s3 3 3 3v7"/></svg>,
    arrowRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    trophy: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="11"/><path d="M7 4h10v5a5 5 0 01-10 0V4z"/><path d="M17 5h2a2 2 0 012 2v2a4 4 0 01-4 4"/><path d="M7 5H5a2 2 0 00-2 2v2a4 4 0 004 4"/></svg>,
    clock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  }
  return icons[name] || null
}

/* ─── Stars ──────────────────────────────────────────────────── */
const Stars = ({ rating, size = 12 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map(i => (
      <span key={i} style={{ color: i <= Math.round(rating) ? '#F59E0B' : 'var(--border-default)' }}>
        <Icon name="star" size={size} />
      </span>
    ))}
  </div>
)

/* ─── Skeleton Card ──────────────────────────────────────────── */
const SkeletonCard = ({ view }) => {
  const pulse = { animation: 'pulse 1.5s ease-in-out infinite', backgroundColor: 'var(--skeleton)' }
  if (view === 'list') {
    return (
      <div className="flex items-center gap-4 rounded-2xl p-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-default)' }}>
        <div className="rounded-xl shrink-0" style={{ ...pulse, width: 80, height: 80 }} />
        <div className="flex-1 flex flex-col gap-2">
          <div className="rounded" style={{ ...pulse, height: 16, width: '50%' }} />
          <div className="rounded" style={{ ...pulse, height: 12, width: '30%' }} />
          <div className="rounded" style={{ ...pulse, height: 12, width: '40%' }} />
        </div>
        <div className="rounded-xl shrink-0" style={{ ...pulse, width: 72, height: 32 }} />
      </div>
    )
  }
  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-default)', flex: '1 1 260px', maxWidth: '340px' }}>
      <div style={{ ...pulse, height: 180 }} />
      <div className="p-4 flex flex-col gap-2">
        <div className="rounded" style={{ ...pulse, height: 16, width: '60%' }} />
        <div className="rounded" style={{ ...pulse, height: 12, width: '40%' }} />
        <div className="rounded" style={{ ...pulse, height: 12, width: '55%' }} />
      </div>
    </div>
  )
}

/* ─── Restaurant Card — Grid ─────────────────────────────────── */
const GridCard = ({ restaurant }) => {
  const { name, cuisine, location, rating, reviews, badge, rank } = restaurant
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col group"
      style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-default)', flex: '1 1 260px', maxWidth: '340px', transition: 'box-shadow 0.18s, transform 0.18s', cursor: 'pointer' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(241,89,42,0.13)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div className="relative overflow-hidden" style={{ height: 180, backgroundColor: 'var(--img-bg)' }}>
        <div className="w-full h-full flex items-center justify-center" style={{ color: 'rgba(241,89,42,0.15)' }}>
          <Icon name="utensils" size={52} />
        </div>
        {badge && (
          <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>{badge}</span>
        )}
        {rank && (
          <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1" style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#fff', backdropFilter: 'blur(4px)' }}>
            <Icon name="trophy" size={11} /> #{rank}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-base exo-2 leading-snug" style={{ color: 'var(--text-main)' }}>{name}</h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-lg shrink-0" style={{ backgroundColor: 'rgba(241,89,42,0.1)', color: 'var(--accent)' }}>{cuisine}</span>
        </div>
        <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
          <Icon name="mapPin" size={13} />
          <span className="text-xs">{location}</span>
        </div>
        <div className="flex items-center justify-between pt-2 mt-auto" style={{ borderTop: '1px solid var(--border-default)' }}>
          <div className="flex items-center gap-1.5">
            <Stars rating={rating} />
            <span className="text-xs font-bold" style={{ color: 'var(--text-main)' }}>{rating}</span>
          </div>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{reviews} reviews</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Restaurant Card — List ─────────────────────────────────── */
const ListCard = ({ restaurant }) => {
  const { name, cuisine, location, rating, reviews, badge, rank } = restaurant
  return (
    <div
      className="flex items-center gap-4 rounded-2xl p-4 group"
      style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-default)', transition: 'box-shadow 0.18s', cursor: 'pointer' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(241,89,42,0.1)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Thumbnail */}
      <div className="rounded-xl shrink-0 flex items-center justify-center relative overflow-hidden" style={{ width: 80, height: 80, backgroundColor: 'var(--img-bg)', color: 'rgba(241,89,42,0.2)' }}>
        <Icon name="utensils" size={28} />
        {rank && (
          <span className="absolute bottom-0 right-0 text-xs font-bold px-1.5 py-0.5 flex items-center gap-0.5" style={{ backgroundColor: 'var(--accent)', color: '#fff', fontSize: 10 }}>
            #{rank}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-bold text-base exo-2" style={{ color: 'var(--text-main)' }}>{name}</h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-lg" style={{ backgroundColor: 'rgba(241,89,42,0.1)', color: 'var(--accent)' }}>{cuisine}</span>
          {badge && <span className="text-xs font-bold px-2 py-0.5 rounded-lg" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>{badge}</span>}
        </div>
        <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
          <Icon name="mapPin" size={12} />
          <span className="text-xs">{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Stars rating={rating} size={11} />
          <span className="text-xs font-bold" style={{ color: 'var(--text-main)' }}>{rating}</span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>· {reviews} reviews</span>
        </div>
      </div>

      {/* CTA */}
      <button
        className="shrink-0 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5"
        style={{ backgroundColor: 'rgba(241,89,42,0.1)', color: 'var(--accent)', border: 'none', cursor: 'pointer', transition: 'background 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--accent)' && (e.currentTarget.style.color = '#fff')}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(241,89,42,0.1)'; e.currentTarget.style.color = 'var(--accent)' }}
      >
        View <Icon name="arrowRight" size={13} />
      </button>
    </div>
  )
}

/* ─── Empty State ────────────────────────────────────────────── */
const EmptyState = ({ query, onSuggest }) => {
  const suggestions = ['pizza', 'burgers', 'sushi', 'bbq', 'italian', 'mexican', 'seafood', 'vegan']
  return (
    <div className="flex flex-col items-center text-center gap-6 py-20 px-4">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ backgroundColor: 'rgba(241,89,42,0.1)', color: 'var(--accent)' }}
      >
        <Icon name="search" size={36} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="exo-2 font-bold text-2xl" style={{ color: 'var(--text-main)' }}>
          No results for "{query}"
        </h3>
        <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'var(--text-muted)' }}>
          We couldn't find any restaurants matching your search. Try one of these popular categories:
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {suggestions.map(s => (
          <button
            key={s}
            onClick={() => onSuggest(s)}
            className="text-sm font-semibold px-4 py-2 rounded-full capitalize"
            style={{ backgroundColor: 'var(--bg-card)', border: '1.5px solid var(--border-default)', color: 'var(--text-main)', cursor: 'pointer', transition: 'border-color 0.15s, color 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.color = 'var(--text-main)' }}
          >
            {s}
          </button>
        ))}
      </div>
      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
        Or <a href="/" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>browse all restaurants</a> on the home page.
      </p>
    </div>
  )
}

/* ─── Sort Dropdown ──────────────────────────────────────────── */
const SortDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false)
  const options = [
    { value: 'rating', label: 'Top Rated', icon: 'star' },
    { value: 'name', label: 'Name (A–Z)', icon: 'list' },
    { value: 'newest', label: 'Newest First', icon: 'clock' },
  ]
  const selected = options.find(o => o.value === value)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(p => !p)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
        style={{ backgroundColor: 'var(--bg-card)', border: '1.5px solid var(--border-default)', color: 'var(--text-main)', cursor: 'pointer', minWidth: 160 }}
      >
        <Icon name={selected.icon} size={15} />
        <span className="flex-1 text-left">{selected.label}</span>
        <span style={{ color: 'var(--text-muted)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          <Icon name="chevronDown" size={14} />
        </span>
      </button>
      {open && (
        <div
          className="absolute right-0 top-full mt-1 rounded-xl overflow-hidden z-10"
          style={{ backgroundColor: 'var(--bg-card)', border: '1.5px solid var(--border-default)', minWidth: 160, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
        >
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left"
              style={{
                backgroundColor: opt.value === value ? 'rgba(241,89,42,0.08)' : 'transparent',
                color: opt.value === value ? 'var(--accent)' : 'var(--text-main)',
                border: 'none',
                cursor: 'pointer',
                fontWeight: opt.value === value ? 700 : 500,
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => { if (opt.value !== value) e.currentTarget.style.backgroundColor = 'var(--hover-bg)' }}
              onMouseLeave={e => { if (opt.value !== value) e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              <Icon name={opt.icon} size={14} />
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Main Search Page ───────────────────────────────────────── */
const Search = () => {
  const location = useLocation()
  const { search_restaurants, restaurants: fetchedRestaurants } = useRestaurant()
  const queryParams = new URLSearchParams(location.search)

  const q         = queryParams.get('q')
  const state     = queryParams.get('state')
  const save_listing = queryParams.get('save_listing')
  const city      = queryParams.get('city')
  const dish      = queryParams.get('dish')
  const source    = queryParams.get('source')

  const finalQuery = (() => {
    switch (source) {
      case 'state':          return state || 'all-state'
      case 'save-listing':   return save_listing || 'save-listing'
      case 'restaurant-eats': return `${dish || 'all-dish'}, ${city || 'all-city'}, ${state || 'all-state'}`
      case 'restaurants':    return `${city || 'all-city'}, ${state || 'all-state'}`
      default:               return q || 'all'
    }
  })()

  const queryString = (() => {
    switch (source) {
      case 'state':          return `state=${encodeURIComponent(state || 'all-state')}`
      case 'save-listing':   return `q=${encodeURIComponent(q || 'save-listing')}`
      case 'restaurant-eats': return `dish=${encodeURIComponent(dish || 'all-dish')}&city=${encodeURIComponent(city || 'all-city')}&state=${encodeURIComponent(state || 'all-state')}`
      case 'restaurants':    return `state=${encodeURIComponent(state || 'all-state')}&city=${encodeURIComponent(city || 'all-city')}`
      default:               return `q=${encodeURIComponent(q || 'all')}`
    }
  })()

  const [loading, setLoading] = useState(true)
  const [view, setView]       = useState('grid')   // 'grid' | 'list'
  const [sort, setSort]       = useState('rating')

  // Mock data — replace with fetchedRestaurants from your hook
  const mockData = [
    { id: 1, name: 'The Flame House',    cuisine: 'BBQ',      location: 'Downtown, NYC',   rating: 4.8, reviews: 312, badge: '#1 Ranked', rank: 1 },
    { id: 2, name: 'Sakura Garden',      cuisine: 'Japanese', location: 'Midtown, NYC',    rating: 4.7, reviews: 198, rank: 2 },
    { id: 3, name: 'La Bella Cucina',    cuisine: 'Italian',  location: 'Brooklyn, NYC',   rating: 4.6, reviews: 274, rank: 3 },
    { id: 4, name: 'Spice Route',        cuisine: 'Indian',   location: 'Queens, NYC',     rating: 4.9, reviews: 421, badge: 'Hot 🔥', rank: 4 },
    { id: 5, name: 'The Burger Lab',     cuisine: 'American', location: 'SoHo, NYC',       rating: 4.5, reviews: 156, rank: 5 },
    { id: 6, name: "Ocean's Plate",      cuisine: 'Seafood',  location: 'Battery Park, NYC', rating: 4.7, reviews: 289, rank: 6 },
    { id: 7, name: 'Green Bowl Co.',     cuisine: 'Vegan',    location: 'Chelsea, NYC',    rating: 4.4, reviews: 102, rank: 7 },
    { id: 8, name: 'Golden Dragon',      cuisine: 'Chinese',  location: 'Flushing, NYC',   rating: 4.6, reviews: 344, rank: 8 },
  ]

  const [results, setResults] = useState([])

  useEffect(() => {
    const handleSearch = async () => {
      setLoading(true)
      await search_restaurants(queryString)
      // swap mockData with fetchedRestaurants once your API is wired
      setTimeout(() => {
        setResults(mockData)
        setLoading(false)
      }, 900)
    }
    handleSearch()
  }, [queryString])

  const sorted = [...results].sort((a, b) => {
    if (sort === 'rating') return b.rating - a.rating
    if (sort === 'name')   return a.name.localeCompare(b.name)
    if (sort === 'newest') return b.id - a.id
    return 0
  })

  const handleSuggest = (term) => {
    window.location.href = `/search?q=${encodeURIComponent(term)}`
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '100vh' }}>
      <style>{`
        :root {
          --accent: #F1592A;
          --bg-page: #faf8f5;
          --bg-card: #fff;
          --text-main: #1a1a1a;
          --text-muted: #6b7280;
          --border-default: #f0ede8;
          --skeleton: #f3f0ec;
          --img-bg: #fde8e0;
          --hover-bg: #fdf5f2;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .view-btn { display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 10px; border: 1.5px solid var(--border-default); background: var(--bg-card); cursor: pointer; transition: background 0.15s, border-color 0.15s, color 0.15s; }
        .view-btn.active { background: var(--accent); border-color: var(--accent); color: #fff; }
        .view-btn:not(.active) { color: var(--text-muted); }
        .view-btn:not(.active):hover { border-color: var(--accent); color: var(--accent); }
      `}</style>

      <CommonHeroSec pageName="Search" heading={`Results for: ${finalQuery}`} />

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* ── Toolbar ───────────────────────────────────────── */}
        <div
          className="flex items-center justify-between gap-4 flex-wrap mb-8 px-5 py-4 rounded-2xl"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-default)' }}
        >
          {/* Result count */}
          <p className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
            {loading
              ? 'Searching...'
              : <><span style={{ color: 'var(--text-main)', fontWeight: 700 }}>{results.length}</span> restaurants found</>
            }
          </p>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <SortDropdown value={sort} onChange={setSort} />

            {/* View toggle */}
            <div className="flex items-center gap-1.5">
              <button
                className={`view-btn ${view === 'grid' ? 'active' : ''}`}
                onClick={() => setView('grid')}
                title="Grid view"
              >
                <Icon name="grid" size={16} />
              </button>
              <button
                className={`view-btn ${view === 'list' ? 'active' : ''}`}
                onClick={() => setView('list')}
                title="List view"
              >
                <Icon name="list" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Loading skeletons ──────────────────────────────── */}
        {loading && (
          view === 'grid'
            ? (
              <div className="flex flex-wrap gap-5 justify-center">
                {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} view="grid" />)}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {[1, 2, 3, 4, 5].map(i => <SkeletonCard key={i} view="list" />)}
              </div>
            )
        )}

        {/* ── Results ───────────────────────────────────────── */}
        {!loading && sorted.length > 0 && (
          view === 'grid'
            ? (
              <div className="flex flex-wrap gap-5 justify-center">
                {sorted.map(r => <GridCard key={r.id} restaurant={r} />)}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {sorted.map(r => <ListCard key={r.id} restaurant={r} />)}
              </div>
            )
        )}

        {/* ── Empty state ────────────────────────────────────── */}
        {!loading && sorted.length === 0 && (
          <EmptyState query={finalQuery} onSuggest={handleSuggest} />
        )}

      </div>
    </div>
  )
}

export default Search