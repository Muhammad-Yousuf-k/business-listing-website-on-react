
function SectionCard({ children, className = "" }) {
    return (
        <div
            className={`bg-white rounded-2xl border border-[#e8edf2] p-7 mb-5 ${className}`}
        >
            {children}
        </div>
    );
}

export default SectionCard