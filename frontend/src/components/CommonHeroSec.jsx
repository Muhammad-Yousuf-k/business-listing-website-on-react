import { Link } from "react-router-dom";



/* ─── Icons ─────────────────────────────────────────────────── */
const Icon = ({ name, size = 20 }) => {
    const icons = {
        chevronRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
    };
    return icons[name] || null;
};


const CommonHeroSec = ({pageName = "page Name", heading = "heading", para = ""}) => {
    return (
        <div
            className="relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #000000 0%, #040814 60%, #30333b 100%)", paddingTop: "72px", paddingBottom: "72px" }}
        >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #F1592A, transparent)", transform: "translate(30%, -30%)" }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #F1592A, transparent)", transform: "translate(-30%, 30%)" }} />

            <div className="max-w-7xl mx-auto px-5 sm:px-10 relative z-10">
                {/* Breadcrumb */}
                <div className="flex items-center gap-1 text-xs font-medium mb-5" style={{ color: "rgba(255,255,255,0.55)" }}>
                    <Link to={"/"}>Home</Link>
                    <Icon name="chevronRight" size={13} />
                    <span style={{ color: "#fff" }}>{pageName}</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {heading}
                </h1>
                <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {para}
                </p>
            </div>
        </div>
    )
}

export default CommonHeroSec