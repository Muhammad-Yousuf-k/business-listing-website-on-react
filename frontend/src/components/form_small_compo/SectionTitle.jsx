
function SectionTitle({ children }) {
    return (
        <div className="font-exo font-bold text-[17px] text-black flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f1592a] flex-shrink-0" />
            {children}
        </div>
    );
}

export default SectionTitle