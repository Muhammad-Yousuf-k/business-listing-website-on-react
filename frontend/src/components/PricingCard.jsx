import { Link } from "react-router-dom"
const Icon = ({ name, size = 20 }) => {
  const icons = {
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
  }
  return icons[name] || null
}
const PricingCard = ({ name, price, period, features, highlight, badge }) => {
  return (
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
      <Link to={"/owner/listing-management"}>
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
      </Link>
    </div>
  )
}

export default PricingCard