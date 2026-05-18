import { useState } from 'react'

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
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
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

export default FAQ