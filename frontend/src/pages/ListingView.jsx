import { useState } from "react";

/* ─── Mock Data ─────────────────────────────────────────────── */
const listing = {
  name: "The Golden Fork",
  category: "Fine Dining · Italian",
  rating: 4.7,
  reviewCount: 284,
  priceRange: "$$$",
  coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
  description:
    "The Golden Fork is an award-winning Italian fine dining restaurant nestled in the heart of downtown. Our executive chef crafts each dish using locally sourced ingredients and time-honored recipes passed down through generations. From hand-rolled pasta to wood-fired pizzas, every bite tells a story of passion and craftsmanship. We take pride in delivering an unforgettable dining experience with warm hospitality and an unrivalled wine selection.",
  address: {
    full: "142 West Elm Street, Suite 3",
    city: "San Francisco",
    state: "California",
    zip: "94102",
  },
  contact: {
    phone: "+1 (415) 882-4400",
    whatsapp: "+1 (415) 882-4411",
    email: "hello@goldenfork.com",
  },
  hours: [
    { day: "Monday", open: "11:00 AM", close: "10:00 PM", closed: false },
    { day: "Tuesday", open: "11:00 AM", close: "10:00 PM", closed: false },
    { day: "Wednesday", open: "11:00 AM", close: "10:00 PM", closed: false },
    { day: "Thursday", open: "11:00 AM", close: "11:00 PM", closed: false },
    { day: "Friday", open: "11:00 AM", close: "12:00 AM", closed: false },
    { day: "Saturday", open: "10:00 AM", close: "12:00 AM", closed: false },
    { day: "Sunday", open: "10:00 AM", close: "9:00 PM", closed: false },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
  ],
  menu: [
    {
      category: "Starters",
      items: [
        { name: "Bruschetta al Pomodoro", desc: "Grilled sourdough, heirloom tomato, basil oil", price: "$14" },
        { name: "Burrata e Prosciutto", desc: "Fresh burrata, aged prosciutto, fig jam", price: "$18" },
        { name: "Calamari Fritti", desc: "Crispy fried calamari, lemon aioli", price: "$16" },
      ],
    },
    {
      category: "Pasta",
      items: [
        { name: "Tagliatelle al Ragù", desc: "Hand-rolled pasta, slow-cooked beef ragù", price: "$28" },
        { name: "Cacio e Pepe", desc: "Tonnarelli, pecorino romano, black pepper", price: "$24" },
        { name: "Pappardelle al Tartufo", desc: "Wild mushrooms, black truffle, parmigiano", price: "$36" },
      ],
    },
    {
      category: "Mains",
      items: [
        { name: "Bistecca alla Fiorentina", desc: "28-day dry-aged T-bone, rosemary butter, arugula", price: "$62" },
        { name: "Branzino al Limone", desc: "Pan-seared sea bass, capers, lemon caper sauce", price: "$44" },
      ],
    },
    {
      category: "Desserts",
      items: [
        { name: "Tiramisù Classico", desc: "Espresso-soaked ladyfingers, mascarpone cream", price: "$12" },
        { name: "Panna Cotta", desc: "Vanilla bean panna cotta, berry coulis", price: "$11" },
      ],
    },
  ],
  facilities: [
    { icon: "wifi", label: "Free Wi-Fi" },
    { icon: "parking", label: "Valet Parking" },
    { icon: "accessible", label: "Wheelchair Accessible" },
    { icon: "outdoor", label: "Outdoor Seating" },
    { icon: "reservation", label: "Reservations" },
    { icon: "bar", label: "Full Bar" },
    { icon: "tv", label: "Live Music" },
    { icon: "card", label: "Card Accepted" },
    { icon: "takeout", label: "Takeout" },
    { icon: "delivery", label: "Delivery" },
  ],
  reviews: [
    {
      name: "Sarah M.",
      avatar: "SM",
      rating: 5,
      date: "March 12, 2025",
      text: "Absolutely incredible experience. The tagliatelle was the best pasta I've had outside of Italy. Staff was warm and attentive without being intrusive. Will be back every chance I get.",
    },
    {
      name: "James T.",
      avatar: "JT",
      rating: 4,
      date: "February 28, 2025",
      text: "Beautiful ambiance and exceptional food. The burrata starter was a highlight. Slightly long wait for mains on a Saturday night, but the quality made up for it.",
    },
    {
      name: "Priya K.",
      avatar: "PK",
      rating: 5,
      date: "January 15, 2025",
      text: "We celebrated our anniversary here and everything was perfect. Chef even sent a complimentary dessert. The Bistecca is worth every penny.",
    },
  ],
  related: [
    { name: "Casa Bella", category: "Italian · Casual", rating: 4.3, image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80" },
    { name: "Trattoria Napoli", category: "Pizza · Family", rating: 4.5, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80" },
    { name: "Il Piccolo", category: "Fine Dining · Wine Bar", rating: 4.6, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80" },
  ],
};

/* ─── Icons ──────────────────────────────────────────────────── */
const Icon = ({ name, size = 18 }) => {
  const icons = {
    phone: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" /></svg>,
    whatsapp: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
    email: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
    location: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    clock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    wifi: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0114.08 0" /><path d="M1.42 9a16 16 0 0121.16 0" /><path d="M8.53 16.11a6 6 0 016.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>,
    parking: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 17V7h4a3 3 0 010 6H9" /></svg>,
    accessible: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="4" r="2" /><path d="M19 13v-2a2 2 0 00-2-2h-4l-3-3" /><path d="M5 15l2 2 4-4" /><path d="M10 21l2-4 4 2" /></svg>,
    outdoor: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    reservation: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    bar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>,
    tv: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2" /><polyline points="17 2 12 7 7 2" /></svg>,
    card: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
    takeout: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>,
    delivery: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
    chevronRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
    mapPin: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    share: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>,
    bookmark: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>,
  };
  return icons[name] || null;
};

/* ─── Stars ──────────────────────────────────────────────────── */
const Stars = ({ rating, size = 14 }) => (
  <span className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} style={{ color: s <= Math.round(rating) ? "#f59e0b" : "var(--border-default)" }}>
        <Icon name="star" size={size} />
      </span>
    ))}
  </span>
);

/* ─── Section Wrapper ────────────────────────────────────────── */
const Section = ({ id, title, children }) => (
  <section id={id} className="rounded-2xl p-6 sm:p-8" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
    <h2 className="text-xl font-bold mb-5 pb-4" style={{ color: "var(--text-main)", borderBottom: "1px solid var(--border-default)", fontFamily: "'Sora', sans-serif" }}>
      {title}
    </h2>
    {children}
  </section>
);

/* ─── Sidebar Info Card ──────────────────────────────────────── */
const InfoCard = ({ children }) => (
  <div className="rounded-2xl p-5" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
    {children}
  </div>
);

/* ─── Main Component ─────────────────────────────────────────── */
function ListingView() {
  const [activeMenu, setActiveMenu] = useState("Starters");
  const [lightbox, setLightbox] = useState(null);
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div style={{ backgroundColor: "var(--bg-page)", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" }}>
      <style>{`
        :root {
          --bg-page: #f7f9fc;
          --bg-card: #ffffff;
          --primary: #2563eb;
          --primary-hover: #1d4ed8;
          --text-main: #0f172a;
          --text-muted: #64748b;
          --border-default: #e2e8f0;
          --error-bg: #fff1f2;
          --error-border: #fecdd3;
          --error-text: #e11d48;
        }
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Sora:wght@600;700;800&display=swap');
        .nav-pill { scroll-behavior: smooth; }
        .menu-tab.active { background: var(--primary); color: #fff; }
        .menu-tab { transition: background 0.15s, color 0.15s; }
        .gallery-img { transition: transform 0.2s; }
        .gallery-img:hover { transform: scale(1.03); }
        .related-card { transition: box-shadow 0.2s, transform 0.2s; }
        .related-card:hover { box-shadow: 0 8px 28px rgba(37,99,235,0.13); transform: translateY(-2px); }
      `}</style>

      {/* ── Hero / Cover ── */}
      <div className="relative w-full" style={{ height: "380px", overflow: "hidden" }}>
        <img src={listing.coverImage} alt={listing.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(15,23,42,0.25) 0%, rgba(15,23,42,0.72) 100%)" }} />
        {/* Breadcrumb */}
        <div className="absolute top-5 left-5 sm:left-10 flex items-center gap-1 text-xs font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>
          <span>Home</span>
          <Icon name="chevronRight" size={13} />
          <span>Listings</span>
          <Icon name="chevronRight" size={13} />
          <span style={{ color: "#fff" }}>{listing.name}</span>
        </div>
        {/* Hero info */}
        <div className="absolute bottom-0 left-0 right-0 px-5 sm:px-10 pb-7">
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3" style={{ backgroundColor: "var(--primary)", color: "#fff" }}>
            {listing.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
            {listing.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white">
            <span className="flex items-center gap-1.5">
              <Stars rating={listing.rating} size={15} />
              <span className="font-semibold">{listing.rating}</span>
              <span style={{ color: "rgba(255,255,255,0.65)" }}>({listing.reviewCount} reviews)</span>
            </span>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>·</span>
            <span>{listing.priceRange}</span>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>·</span>
            <span className="flex items-center gap-1"><Icon name="mapPin" size={14} />{listing.address.city}, {listing.address.state}</span>
          </div>
        </div>
        {/* Action buttons */}
        <div className="absolute top-5 right-5 sm:right-10 flex items-center gap-2">
          {["share", "bookmark"].map((ic) => (
            <button key={ic} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.18)", color: "#fff", backdropFilter: "blur(6px)" }}>
              <Icon name={ic} size={16} />
            </button>
          ))}
        </div>
      </div>

      {/* ── Sticky Section Nav ── */}
      <div className="sticky top-0 z-30 w-full overflow-x-auto" style={{ backgroundColor: "var(--bg-card)", borderBottom: "1px solid var(--border-default)" }}>
        <div className="flex items-center gap-1 px-5 sm:px-10 min-w-max">
          {["about", "contact", "hours", "gallery", "menu", "facilities", "reviews", "related"].map((s) => (
            <a key={s} href={`#${s}`} className="px-4 py-4 text-sm font-medium capitalize transition-colors duration-150 border-b-2 whitespace-nowrap"
              style={{ color: "var(--text-muted)", borderBottomColor: "transparent" }}
              onMouseEnter={(e) => { e.target.style.color = "var(--primary)"; e.target.style.borderBottomColor = "var(--primary)"; }}
              onMouseLeave={(e) => { e.target.style.color = "var(--text-muted)"; e.target.style.borderBottomColor = "transparent"; }}
            >
              {s === "about" ? "About" : s === "hours" ? "Hours" : s === "related" ? "Related" : s.charAt(0).toUpperCase() + s.slice(1)}
            </a>
          ))}
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* About */}
          <Section id="about" title="About">
            <p className="leading-relaxed text-[15px]" style={{ color: "var(--text-muted)" }}>{listing.description}</p>
          </Section>

          {/* Gallery */}
          <Section id="gallery" title="Gallery">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {listing.gallery.map((img, i) => (
                <div key={i} className="gallery-img rounded-xl overflow-hidden cursor-pointer" style={{ aspectRatio: "4/3" }} onClick={() => setLightbox(img)}>
                  <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </Section>

          {/* Menu */}
          <Section id="menu" title="Menu">
            {/* Category tabs */}
            <div className="flex gap-2 flex-wrap mb-5">
              {listing.menu.map((cat) => (
                <button key={cat.category} className="menu-tab px-4 py-1.5 rounded-full text-sm font-semibold border"
                  style={activeMenu === cat.category
                    ? { backgroundColor: "var(--primary)", color: "#fff", borderColor: "var(--primary)" }
                    : { backgroundColor: "transparent", color: "var(--text-muted)", borderColor: "var(--border-default)" }}
                  onClick={() => setActiveMenu(cat.category)}
                >
                  {cat.category}
                </button>
              ))}
            </div>
            {/* Items */}
            <div className="flex flex-col gap-3">
              {listing.menu.find((c) => c.category === activeMenu)?.items.map((item, i) => (
                <div key={i} className="flex items-start justify-between gap-4 p-4 rounded-xl" style={{ backgroundColor: "var(--bg-page)", border: "1px solid var(--border-default)" }}>
                  <div>
                    <p className="font-semibold text-[15px]" style={{ color: "var(--text-main)" }}>{item.name}</p>
                    <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
                  </div>
                  <span className="font-bold text-sm shrink-0 mt-0.5" style={{ color: "var(--primary)" }}>{item.price}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Facilities */}
          <Section id="facilities" title="Facilities & Features">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {listing.facilities.map((f) => (
                <div key={f.label} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "var(--bg-page)", border: "1px solid var(--border-default)" }}>
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(37,99,235,0.08)", color: "var(--primary)" }}>
                    <Icon name={f.icon} size={16} />
                  </span>
                  <span className="text-sm font-medium" style={{ color: "var(--text-main)" }}>{f.label}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Reviews */}
          <Section id="reviews" title={`Reviews (${listing.reviewCount})`}>
            {/* Summary bar */}
            <div className="flex items-center gap-5 p-5 rounded-xl mb-5" style={{ backgroundColor: "var(--bg-page)", border: "1px solid var(--border-default)" }}>
              <div className="text-center">
                <p className="text-4xl font-bold" style={{ color: "var(--text-main)", fontFamily: "'Sora', sans-serif" }}>{listing.rating}</p>
                <Stars rating={listing.rating} size={16} />
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{listing.reviewCount} reviews</p>
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                {[5, 4, 3, 2, 1].map((n) => (
                  <div key={n} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                    <span className="w-2">{n}</span>
                    <Icon name="star" size={11} />
                    <div className="flex-1 rounded-full h-1.5" style={{ backgroundColor: "var(--border-default)" }}>
                      <div className="h-1.5 rounded-full" style={{ width: `${n === 5 ? 68 : n === 4 ? 20 : n === 3 ? 8 : 3}%`, backgroundColor: n >= 4 ? "#f59e0b" : "#e2e8f0" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Review cards */}
            <div className="flex flex-col gap-4">
              {listing.reviews.map((r, i) => (
                <div key={i} className="p-5 rounded-xl" style={{ border: "1px solid var(--border-default)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ backgroundColor: "var(--primary)" }}>
                      {r.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm" style={{ color: "var(--text-main)" }}>{r.name}</p>
                      <div className="flex items-center gap-2">
                        <Stars rating={r.rating} size={12} />
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{r.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{r.text}</p>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold border transition-colors duration-150"
              style={{ borderColor: "var(--border-default)", color: "var(--text-muted)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-default)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >
              Load more reviews
            </button>
          </Section>

          {/* Related Listings */}
          <section id="related">
            <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-main)", fontFamily: "'Sora', sans-serif" }}>Related Listings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {listing.related.map((r, i) => (
                <div key={i} className="related-card rounded-2xl overflow-hidden cursor-pointer" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
                  <div className="overflow-hidden" style={{ height: "140px" }}>
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover gallery-img" />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-sm" style={{ color: "var(--text-main)" }}>{r.name}</p>
                    <p className="text-xs mt-0.5 mb-2" style={{ color: "var(--text-muted)" }}>{r.category}</p>
                    <div className="flex items-center gap-1.5">
                      <Stars rating={r.rating} size={12} />
                      <span className="text-xs font-semibold" style={{ color: "var(--text-main)" }}>{r.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Right Sidebar ── */}
        <div className="flex flex-col gap-5">

          {/* CTA */}
          <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, var(--primary) 0%, #1d4ed8 100%)" }}>
            <p className="font-bold text-white text-lg mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>Make a Reservation</p>
            <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.75)" }}>Book your table in seconds.</p>
            <button className="w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-150" style={{ backgroundColor: "#fff", color: "var(--primary)" }}>
              Reserve a Table
            </button>
          </div>

          {/* Contact */}
          <InfoCard>
            <p className="font-bold text-base mb-4" style={{ color: "var(--text-main)", fontFamily: "'Sora', sans-serif" }} id="contact">Contact</p>
            <div className="flex flex-col gap-3">
              {[
                { icon: "phone", label: "Phone", value: listing.contact.phone, href: `tel:${listing.contact.phone}` },
                { icon: "whatsapp", label: "WhatsApp", value: listing.contact.whatsapp, href: `https://wa.me/${listing.contact.whatsapp.replace(/\D/g, "")}` },
                { icon: "email", label: "Email", value: listing.contact.email, href: `mailto:${listing.contact.email}` },
              ].map((c) => (
                <a key={c.label} href={c.href} className="flex items-center gap-3 group" target={c.icon === "whatsapp" ? "_blank" : undefined} rel="noreferrer">
                  <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-150"
                    style={{ backgroundColor: "rgba(37,99,235,0.08)", color: "var(--primary)" }}>
                    <Icon name={c.icon} size={16} />
                  </span>
                  <div>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{c.label}</p>
                    <p className="text-sm font-medium" style={{ color: "var(--text-main)" }}>{c.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </InfoCard>

          {/* Address */}
          <InfoCard>
            <p className="font-bold text-base mb-4" style={{ color: "var(--text-main)", fontFamily: "'Sora', sans-serif" }}>Address</p>
            <div className="flex items-start gap-3 mb-4">
              <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "rgba(37,99,235,0.08)", color: "var(--primary)" }}>
                <Icon name="location" size={16} />
              </span>
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--text-main)" }}>{listing.address.full}</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{listing.address.city}, {listing.address.state} {listing.address.zip}</p>
              </div>
            </div>
            {/* Google Map embed placeholder */}
            <div id="contact" className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-default)", height: "180px" }}>
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019565!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              />
            </div>
          </InfoCard>

          {/* Hours */}
          <InfoCard>
            <p className="font-bold text-base mb-4" style={{ color: "var(--text-main)", fontFamily: "'Sora', sans-serif" }} id="hours">Hours of Operation</p>
            <div className="flex flex-col gap-1.5">
              {listing.hours.map((h) => {
                const isToday = h.day === today;
                return (
                  <div key={h.day} className="flex items-center justify-between px-3 py-2 rounded-lg text-sm"
                    style={{ backgroundColor: isToday ? "rgba(37,99,235,0.07)" : "transparent", border: isToday ? "1px solid rgba(37,99,235,0.15)" : "1px solid transparent" }}>
                    <span className="font-medium" style={{ color: isToday ? "var(--primary)" : "var(--text-main)" }}>{h.day}</span>
                    <span style={{ color: h.closed ? "var(--error-text)" : isToday ? "var(--primary)" : "var(--text-muted)" }}>
                      {h.closed ? "Closed" : `${h.open} – ${h.close}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </InfoCard>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(15,23,42,0.9)" }} onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Gallery" className="max-w-3xl w-full rounded-2xl object-contain" style={{ maxHeight: "85vh" }} />
        </div>
      )}
    </div>
  );
}

export default ListingView;
