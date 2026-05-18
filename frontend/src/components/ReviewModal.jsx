// src/components/AddReviewModal.jsx

import { useState, useEffect, useRef } from "react"
import { useUser } from "../hooks/useUser"
import { useRestaurant } from "../hooks/useRestaurant"
import { toast } from "react-toastify"
import api from "../api/interceptors"

/* ─── Icons ──────────────────────────────────────────────────── */
const Icon = ({ name, size = 18 }) => {
    const icons = {
        x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
        star: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
        check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
        pen: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
    }
    return icons[name] || null
}

/* ─── Star rating input ──────────────────────────────────────── */
const RATING_LABELS = { 1: "Poor", 2: "Fair", 3: "Good", 4: "Very Good", 5: "Excellent" }

const StarRating = ({ value, onChange }) => {
    const [hovered, setHovered] = useState(0)
    const active = hovered || value

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map(n => (
                    <button
                        key={n}
                        type="button"
                        onClick={() => onChange(n)}
                        onMouseEnter={() => setHovered(n)}
                        onMouseLeave={() => setHovered(0)}
                        style={{
                            background: "none",
                            border: "none",
                            padding: "2px",
                            cursor: "pointer",
                            color: n <= active ? "#F59E0B" : "#e5e7eb",
                            transition: "color 0.1s, transform 0.1s",
                            transform: n <= active ? "scale(1.15)" : "scale(1)",
                            lineHeight: 0,
                        }}
                        aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                    >
                        <Icon name="star" size={28} />
                    </button>
                ))}
                {active > 0 && (
                    <span
                        className="ml-1 text-sm font-bold"
                        style={{ color: "#F59E0B", minWidth: 72, animation: "fadeUp 0.15s ease" }}
                    >
                        {RATING_LABELS[active]}
                    </span>
                )}
            </div>
        </div>
    )
}

/* ─── Avatar initials ────────────────────────────────────────── */
const AvatarBadge = ({ name, img }) => {
    const initials = (name || "U")
        .split(" ")
        .map(w => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

    if (img && img !== "/unknownuser.png") {
        return (
            <img
                src={img}
                alt={name}
                className="w-10 h-10 rounded-full object-cover shrink-0"
                style={{ border: "2px solid #F1592A" }}
            />
        )
    }

    return (
        <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
            style={{ backgroundColor: "rgba(241,89,42,0.12)", color: "#F1592A", border: "2px solid rgba(241,89,42,0.3)" }}
        >
            {initials}
        </div>
    )
}

/* ─── Main Modal ─────────────────────────────────────────────── */
/**
 * Props:
 *   open         boolean  — controls visibility
 *   onClose      fn       — called when modal should close
 *   restaurantId string   — MongoDB ObjectId of the restaurant
 *   restaurantName string — display name shown in the form
 *   onSuccess    fn?      — called after a successful submission
 */
export default function AddReviewModal({ open, onClose, restaurantId, restaurantName }) {

    const { user, userAvatar, isLoggedIn } = useUser()
    const { createReview } = useRestaurant()
    const [rating, setRating] = useState(0)
    const [text, setText] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [done, setDone] = useState(false)
    const [errors, setErrors] = useState({})

    const textRef = useRef(null)
    const overlayRef = useRef(null)

    /* Reset state when modal opens */
    useEffect(() => {
        if (open) {
            setRating(0); setText(""); setErrors({}); setDone(false); setSubmitting(false)
            setTimeout(() => textRef.current?.focus(), 120)
        }
    }, [open])

    /* Close on Escape */
    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose() }
        if (open) document.addEventListener("keydown", handler)
        return () => document.removeEventListener("keydown", handler)
    }, [open, onClose])

    /* Lock body scroll */
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [open])

    /* Click backdrop to close */
    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) onClose()
    }

    /* Validation */
    const validate = () => {
        const e = {}
        if (rating === 0) e.rating = "Please select a rating."
        if (!text.trim()) e.text = "Review text is required."
        else if (text.trim().length < 10) e.text = "Review must be at least 10 characters."
        else if (text.length > 1000) e.text = "Review cannot exceed 1000 characters."
        return e
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const fieldErrors = validate()
        if (Object.keys(fieldErrors).length) { setErrors(fieldErrors); return }
        setErrors({})

        setSubmitting(true)
        await createReview(restaurantId, rating, text)
        onClose()
        setSubmitting(false)

    }

    if (!open) return null

    return (
        <>
            <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes modalIn { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes popIn { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
        .review-textarea { width: 100%; padding: 12px 14px; border-radius: 10px; font-size: 14px; outline: none; font-family: inherit; resize: vertical; min-height: 120px; transition: border-color 0.15s, box-shadow 0.15s; line-height: 1.6; }
        .review-textarea::placeholder { color: #c4bfba; }
        .review-textarea:focus { border-color: #F1592A !important; box-shadow: 0 0 0 3px rgba(241,89,42,0.1); }
        .submit-btn { width: 100%; padding: 12px; border-radius: 10px; border: none; background: #F1592A; color: #fff; font-size: 15px; font-weight: 700; cursor: pointer; transition: background 0.15s, transform 0.12s, box-shadow 0.15s; font-family: inherit; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .submit-btn:hover:not(:disabled) { background: #d94820; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(241,89,42,0.28); }
        .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .cancel-btn { flex: 1; padding: 12px; border-radius: 10px; background: transparent; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; transition: background 0.15s; border: 1.5px solid #e5e7eb; color: #6b7280; }
        .cancel-btn:hover { background: #f9f6f3; border-color: #d1d5db; }
      `}</style>

            {/* ── Overlay ───────────────────────────────────────────── */}
            <div
                ref={overlayRef}
                onClick={handleOverlayClick}
                style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(4px)",
                    zIndex: 9998,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "16px",
                }}
            >
                {/* ── Modal panel ───────────────────────────────────── */}
                <div
                    style={{
                        width: "100%",
                        maxWidth: "480px",
                        backgroundColor: "#fff",
                        borderRadius: "20px",
                        overflow: "hidden",
                        boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
                        animation: "modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both",
                        fontFamily: "'DM Sans', sans-serif",
                    }}
                >
                    {/* Header */}
                    <div
                        className="flex items-center justify-between px-6 py-4"
                        style={{ borderBottom: "1px solid #f0ede8", backgroundColor: "#fdf9f7" }}
                    >
                        <div className="flex items-center gap-2.5">
                            <span
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: "rgba(241,89,42,0.1)", color: "#F1592A" }}
                            >
                                <Icon name="pen" size={15} />
                            </span>
                            <div>
                                <p className="font-bold text-sm" style={{ color: "#1a1a1a", fontFamily: "'Sora', sans-serif" }}>Write a Review</p>
                                {restaurantName && (
                                    <p className="text-xs" style={{ color: "#9ca3af" }}>for {restaurantName}</p>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 4, borderRadius: 8, display: "flex", transition: "background 0.15s, color 0.15s" }}
                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#fde8de"; e.currentTarget.style.color = "#F1592A" }}
                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#9ca3af" }}
                            aria-label="Close"
                        >
                            <Icon name="x" size={18} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="px-6 py-6">

                        {/* ── Success state ─────────────────────────────── */}
                        {done ? (
                            <div className="flex flex-col items-center text-center gap-4 py-8">
                                <div
                                    style={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: "50%",
                                        backgroundColor: "rgba(16,185,129,0.1)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#10b981",
                                        animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
                                    }}
                                >
                                    <Icon name="check" size={28} />
                                </div>
                                <div>
                                    <p className="font-bold text-lg mb-1" style={{ color: "#1a1a1a", fontFamily: "'Sora', sans-serif" }}>Review Submitted!</p>
                                    <p className="text-sm" style={{ color: "#6b7280" }}>
                                        Thanks for sharing your experience{restaurantName ? ` at ${restaurantName}` : ""}.
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="submit-btn"
                                    style={{ maxWidth: 180, marginTop: 4 }}
                                >
                                    Done
                                </button>
                            </div>
                        ) : (

                            /* ── Form ────────────────────────────────────── */
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                                {/* Reviewer info row */}
                                {isLoggedIn && (
                                    <div
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl"
                                        style={{ backgroundColor: "#fdf9f7", border: "1px solid #f0ede8" }}
                                    >
                                        <AvatarBadge name={user?.name} img={userAvatar} />
                                        <div>
                                            <p className="text-sm font-bold" style={{ color: "#1a1a1a" }}>{user?.name || "Anonymous"}</p>
                                            <p className="text-xs" style={{ color: "#9ca3af" }}>Posting as yourself</p>
                                        </div>
                                    </div>
                                )}

                                {/* Star rating */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold" style={{ color: "#374151" }}>
                                        Your Rating <span style={{ color: "#ef4444" }}>*</span>
                                    </label>
                                    <StarRating value={rating} onChange={(v) => { setRating(v); if (errors.rating) setErrors(p => ({ ...p, rating: "" })) }} />
                                    {errors.rating && <p className="text-xs font-medium" style={{ color: "#ef4444" }}>{errors.rating}</p>}
                                </div>

                                {/* Review text */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold" style={{ color: "#374151" }}>
                                        Your Review <span style={{ color: "#ef4444" }}>*</span>
                                    </label>
                                    <textarea
                                        ref={textRef}
                                        className="review-textarea"
                                        value={text}
                                        onChange={e => { setText(e.target.value); if (errors.text) setErrors(p => ({ ...p, text: "" })) }}
                                        placeholder={`What did you think of ${restaurantName || "this restaurant"}? Share your experience...`}
                                        maxLength={1000}
                                        style={{
                                            backgroundColor: errors.text ? "#fef2f2" : "#fff",
                                            border: `1.5px solid ${errors.text ? "#fca5a5" : "#e5e7eb"}`,
                                            color: "#1a1a1a",
                                        }}
                                    />
                                    <div className="flex items-center justify-between">
                                        {errors.text
                                            ? <p className="text-xs font-medium" style={{ color: "#ef4444" }}>{errors.text}</p>
                                            : <span />
                                        }
                                        <p
                                            className="text-xs ml-auto"
                                            style={{ color: text.length > 900 ? "#ef4444" : "#9ca3af" }}
                                        >
                                            {text.length} / 1000
                                        </p>
                                    </div>
                                </div>

                                {/* Note about unique review */}
                                <p className="text-xs" style={{ color: "#9ca3af", lineHeight: 1.6 }}>
                                    You can only submit one review per restaurant. Reviews may be moderated before appearing publicly.
                                </p>

                                {/* Actions */}
                                <div className="flex gap-3 pt-1">
                                    <button type="button" className="cancel-btn" onClick={onClose}>
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={submitting} className="submit-btn" style={{ flex: 2 }}>
                                        {submitting
                                            ? <>
                                                <span style={{ width: 15, height: 15, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                                                Submitting...
                                            </>
                                            : <><Icon name="pen" size={15} /> Submit Review</>
                                        }
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}