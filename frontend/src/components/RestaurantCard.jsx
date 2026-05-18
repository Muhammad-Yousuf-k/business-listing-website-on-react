import { Link } from 'react-router-dom'

/* ─── Inline SVG Icons ───────────────────────────────────────── */
const Icon = ({ name, size = 20 }) => {
    const icons = {
        mapPin: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
        star: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
        cooking: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>,
    }
    return icons[name] || null
}

const RestaurantCard = ({ data = {}, }) => {
    return (
        <div
            className="rounded-2xl overflow-hidden flex flex-col group bg-(--white-color) border border-(--border-default)"
            style={{ flex: "1 1 280px", maxWidth: "260px" }}
        >
            <Link to={`/view/listing/${data._id}`}>
                <div className="relative overflow-hidden" style={{ height: "180px", backgroundColor: "#1a1a1a" }}>
                    <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #1a0a00 0%, #3d1f0d 50%, #1a0a00 100%)" }}
                    >
                        <img className="w-full h-full " src={data?.images[0] || "/aboutimg1.png"} />
                    </div>
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                        style={{ backgroundColor: "rgba(241,89,42,0.15)" }}
                    >
                        <span className="text-white text-sm font-semibold">View Details</span>
                    </div>
                </div>
            </Link>

            <div className="p-4 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-base exo-2 truncate text-(--semi-black-color)">{data?.name}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-lg shrink-0 " style={{ backgroundColor: "rgba(241,89,42,0.1)", color: "var(--accent-color)" }}>{data?.main_category}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Icon name="mapPin" size={13} />
                    <span className="text-xs text-(--gray-color)">{data?.address?.city}</span>
                </div>
                <div className="flex items-center justify-between pt-1" style={{ borderTop: "1px solid var(--border-default)" }}>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                            <span key={i} style={{ color: i <= Math.floor(data?.rating || 0) ? "#F59E0B" : "var(--border-default)" }}>
                                <Icon name="star" size={12} />
                            </span>
                        ))}
                        <span className="text-xs font-semibold ml-1" style={{ color: "var(--text-main)" }}>{data?.rating || 0}</span>
                    </div>
                    <span className="text-xs text-(--gray-color)">{data?.reviewCount || 0} reviews</span>
                </div>
            </div>
        </div>
    )
}

export default RestaurantCard