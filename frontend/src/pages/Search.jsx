import { useEffect, useState } from 'react'
import CommonHeroSec from "../components/CommonHeroSec"
import { useLocation } from "react-router-dom"
import { useRestaurant } from "../hooks/useRestaurant"
import RestaurantCard from '../components/RestaurantCard'
import ButtonOne from '../components/ButtonOne'
import Icon from "../components/Icon"
import { toast } from 'react-toastify'

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
  const pulse = { animation: 'pulse 1.5s ease-in-out infinite', backgroundColor: 'var(--secondary-color)' }
  if (view === 'list') {
    return (
      <div className="flex items-center gap-4 rounded-2xl p-4" style={{ backgroundColor: 'var(--white-color)', border: '1px solid var(--border-default)' }}>
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
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--white-color)', border: '1px solid var(--border-default)', flex: '1 1 260px', maxWidth: '340px' }}>
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
// const RestaurantCard = ({ restaurant }) => {
//   const { name, cuisine, location, rating, reviews, badge, rank } = restaurant
//   return (
//     <div
//       className="rounded-2xl overflow-hidden flex flex-col group"
//       style={{ backgroundColor: 'var(--white-color)', border: '1px solid var(--border-default)', flex: '1 1 260px', maxWidth: '340px', transition: 'box-shadow 0.18s, transform 0.18s', cursor: 'pointer' }}
//       onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(241,89,42,0.13)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
//       onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
//     >
//       <div className="relative overflow-hidden" style={{ height: 180, backgroundColor: 'var(--error-border)' }}>
//         <div className="w-full h-full flex items-center justify-center" style={{ color: 'rgba(241,89,42,0.15)' }}>
//           <Icon name="utensils" size={52} />
//         </div>
//         {badge && (
//           <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'var(--accent-color)', color: '#fff' }}>{badge}</span>
//         )}
//         {rank && (
//           <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1" style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#fff', backdropFilter: 'blur(4px)' }}>
//             <Icon name="trophy" size={11} /> #{rank}
//           </span>
//         )}
//       </div>
//       <div className="p-4 flex flex-col gap-2 flex-1">
//         <div className="flex items-start justify-between gap-2">
//           <h3 className="font-bold text-base exo-2 leading-snug" style={{ color: 'var(--gray-color)' }}>{name}</h3>
//           <span className="text-xs font-semibold px-2 py-0.5 rounded-lg shrink-0" style={{ backgroundColor: 'rgba(241,89,42,0.1)', color: 'var(--accent-color)' }}>{cuisine}</span>
//         </div>
//         <div className="flex items-center gap-1.5" style={{ color: 'var(--gray-color)' }}>
//           <Icon name="mapPin" size={13} />
//           <span className="text-xs">{location}</span>
//         </div>
//         <div className="flex items-center justify-between pt-2 mt-auto" style={{ borderTop: '1px solid var(--border-default)' }}>
//           <div className="flex items-center gap-1.5">
//             <Stars rating={rating} />
//             <span className="text-xs font-bold" style={{ color: 'var(--gray-color)' }}>{rating}</span>
//           </div>
//           <span className="text-xs" style={{ color: 'var(--gray-color)' }}>{reviews} reviews</span>
//         </div>
//       </div>
//     </div>
//   )
// }

/* ─── Restaurant Card — List ─────────────────────────────────── */
const ListCard = ({ restaurant }) => {
  const { name, cuisine, location, rating, reviews, badge, rank } = restaurant
  return (
    <div
      className="flex items-center gap-4 rounded-2xl p-4 group"
      style={{ backgroundColor: 'var(--white-color)', border: '1px solid var(--border-default)', transition: 'box-shadow 0.18s', cursor: 'pointer' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(241,89,42,0.1)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Thumbnail */}
      <div className="rounded-xl shrink-0 flex items-center justify-center relative overflow-hidden" style={{ width: 80, height: 80, backgroundColor: 'var(--error-border)', color: 'rgba(241,89,42,0.2)' }}>
        <Icon name="utensils" size={28} />
        {rank && (
          <span className="absolute bottom-0 right-0 text-xs font-bold px-1.5 py-0.5 flex items-center gap-0.5" style={{ backgroundColor: 'var(--accent-color)', color: '#fff', fontSize: 10 }}>
            #{rank}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-bold text-base exo-2" style={{ color: 'var(--gray-color)' }}>{name}</h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-lg" style={{ backgroundColor: 'rgba(241,89,42,0.1)', color: 'var(--accent-color)' }}>{cuisine}</span>
          {badge && <span className="text-xs font-bold px-2 py-0.5 rounded-lg" style={{ backgroundColor: 'var(--accent-color)', color: '#fff' }}>{badge}</span>}
        </div>
        <div className="flex items-center gap-1.5" style={{ color: 'var(--gray-color)' }}>
          <Icon name="mapPin" size={12} />
          <span className="text-xs">{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Stars rating={rating} size={11} />
          <span className="text-xs font-bold" style={{ color: 'var(--gray-color)' }}>{rating}</span>
          <span className="text-xs" style={{ color: 'var(--gray-color)' }}>· {reviews} reviews</span>
        </div>
      </div>

      {/* CTA */}
      <button
        className="shrink-0 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5"
        style={{ backgroundColor: 'rgba(241,89,42,0.1)', color: 'var(--accent-color)', border: 'none', cursor: 'pointer', transition: 'background 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--accent-color)' && (e.currentTarget.style.color = '#fff')}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(241,89,42,0.1)'; e.currentTarget.style.color = 'var(--accent-color)' }}
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
        style={{ backgroundColor: 'rgba(241,89,42,0.1)', color: 'var(--accent-color)' }}
      >
        <Icon name="search" size={36} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="exo-2 font-bold text-2xl" style={{ color: 'var(--gray-color)' }}>
          No results for "{query}"
        </h3>
        <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'var(--gray-color)' }}>
          We couldn't find any restaurants matching your search. Try one of these popular categories:
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {suggestions.map(s => (
          <button
            key={s}
            onClick={() => onSuggest(s)}
            className="text-sm font-semibold px-4 py-2 rounded-full capitalize"
            style={{ backgroundColor: 'var(--white-color)', border: '1.5px solid var(--border-default)', color: 'var(--gray-color)', cursor: 'pointer', transition: 'border-color 0.15s, color 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-color)'; e.currentTarget.style.color = 'var(--accent-color)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.color = 'var(--gray-color)' }}
          >
            {s}
          </button>
        ))}
      </div>
      <p className="text-xs" style={{ color: 'var(--gray-color)' }}>
        Or <a href="/" style={{ color: 'var(--accent-color)', fontWeight: 600, textDecoration: 'none' }}>browse all restaurants</a> on the home page.
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
        style={{ backgroundColor: 'var(--white-color)', border: '1.5px solid var(--border-default)', color: 'var(--gray-color)', cursor: 'pointer', minWidth: 160 }}
      >
        <Icon name={selected.icon} size={15} />
        <span className="flex-1 text-left">{selected.label}</span>
        <span style={{ color: 'var(--gray-color)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          <Icon name="chevronDown" size={14} />
        </span>
      </button>
      {open && (
        <div
          className="absolute right-0 top-full mt-1 rounded-xl overflow-hidden z-10"
          style={{ backgroundColor: 'var(--white-color)', border: '1.5px solid var(--border-default)', minWidth: 160, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
        >
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left"
              style={{
                backgroundColor: opt.value === value ? 'rgba(241,89,42,0.08)' : 'transparent',
                color: opt.value === value ? 'var(--accent-color)' : 'var(--gray-color)',
                border: 'none',
                cursor: 'pointer',
                fontWeight: opt.value === value ? 700 : 500,
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => { if (opt.value !== value) e.currentTarget.style.backgroundColor = 'var(--secondary-color)' }}
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
  const { search_restaurants, searchResult } = useRestaurant()
  const queryParams = new URLSearchParams(location.search)
  const [page, setPage] = useState(1)
  const q = queryParams.get('q')
  const q1 = queryParams.get('q1')
  const source = queryParams.get('source')

  const queryString = (() => {
    switch (source) {
      case 'state': return `state/?q=${encodeURIComponent(q || 'none')}&page=${page}&limit=12`
      case 'all-restaurants': return `all-restaurants/?q=${encodeURIComponent(q || 'none')}&page=${page}&limit=12`
      case 'eat': return `eat/?q=${encodeURIComponent(q || 'none')}&q1=${encodeURIComponent(q1 || 'none')}&page=${page}&limit=12`
      case 'top-eats': return `top-eats/?q=${encodeURIComponent(q || 'none')}&page=${page}&limit=12`
      case 'all-reviews': return `all-reviews/?q=${encodeURIComponent(q || 'none')}&page=${page}&limit=12`
      case 'double': return `q=${encodeURIComponent(q || "none")}&q1=${encodeURIComponent(q1 || "none")}`
    }
  })()

  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('grid')   // 'grid' | 'list'
  const [sort, setSort] = useState('rating')

  function pageNext() {
    if (!searchResult?.pagination?.hasNextPage) {
      return toast.info("There is no next page");
    }
    setPage((prev) => prev + 1);
  }

  function pagePrev() {
    if (!searchResult?.pagination?.hasPrevPage) {
      return toast.info("There is no previous page");
    }
    setPage((prev) => prev - 1);
  }


  useEffect(() => {
    const handleSearch = async () => {
      setLoading(true)
      await search_restaurants(queryString)
      setLoading(false)
    }
    handleSearch()
  }, [queryString, page])



  const sorted = [...(searchResult?.result || [])].sort((a, b) => {
    if (sort === "rating") return (b.rating || 0) - (a.rating || 0);
    if (sort === "name") return (a.name || "").localeCompare(b.name || "");
    return 0;
  });


  const handleSuggest = (term) => {
    window.location.href = `/search?q=${encodeURIComponent(term)}`
  }

  return (
    <div style={{ backgroundColor: 'var(--secondary-color)', minHeight: '100vh' }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .view-btn { display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 10px; border: 1.5px solid var(--border-default); background: var(--white-color); cursor: pointer; transition: background 0.15s, border-color 0.15s, color 0.15s; }
        .view-btn.active { background: var(--accent-color); border-color: var(--accent-color); color: #fff; }
        .view-btn:not(.active) { color: var(--gray-color); }
        .view-btn:not(.active):hover { border-color: var(--accent-color); color: var(--accent-color); }
      `}</style>

      <CommonHeroSec pageName="Search" heading={`Results for: ${q || ""},${q1 || ""}`} />

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* ── Toolbar ───────────────────────────────────────── */}
        <div
          className="flex items-center justify-between gap-4 flex-wrap mb-8 px-5 py-4 rounded-2xl"
          style={{ backgroundColor: 'var(--white-color)', border: '1px solid var(--border-default)' }}
        >
          {/* Result count */}
          <p className="text-sm font-semibold" style={{ color: 'var(--gray-color)' }}>
            {loading
              ? 'Searching...'
              : <><span style={{ color: 'var(--gray-color)', fontWeight: 700 }}>{searchResult?.pagination?.totalRestaurants || 0}</span> restaurants found</>
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
                {sorted?.map((e, idx) => <RestaurantCard key={idx} data={e} />)}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {sorted.map(r => <ListCard key={r.id} restaurant={r} />)}
              </div>
            )
        )}

        {!loading && sorted.length > 0 && (
          <div
            className="flex items-center justify-center flex-col gap-2 flex-wrap mt-8 px-5 py-4 rounded-2xl"
            style={{ backgroundColor: 'var(--white-color)', border: '1px solid var(--border-default)' }}
          >

            <span>Pages  {searchResult?.pagination?.currentPage || 0}:{searchResult?.pagination?.totalPages || 1}</span>
            <div className="flex items-center justify-center gap-3">
              {/* Sort */}
              <ButtonOne onClick={pagePrev} title={"Prev"} />
              <ButtonOne onClick={pageNext} title={"Next"} />
            </div>
          </div>

        )}



        {/* ── Empty state ────────────────────────────────────── */}
        {!loading && sorted.length === 0 && (
          <EmptyState query={`${q || ""},${q1 || ""}`} onSuggest={handleSuggest} />
        )}

      </div>
    </div>
  )
}

export default Search