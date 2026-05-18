import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { toast } from "react-toastify"
import { Register_Form_Verificaton } from "../../validator/auth_form_verify"

/* ─── Icons ──────────────────────────────────────────────────── */
const Icon = ({ name, size = 16 }) => {
  const icons = {
    eye: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
    eyeOff: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
    user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    lock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>,
    mapPin: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    store: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
    chevron: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
    trophy: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 21 12 17 16 21" /><line x1="12" y1="17" x2="12" y2="11" /><path d="M7 4h10v5a5 5 0 01-10 0V4z" /><path d="M17 5h2a2 2 0 012 2v2a4 4 0 01-4 4" /><path d="M7 5H5a2 2 0 00-2 2v2a4 4 0 004 4" /></svg>,
  }
  return icons[name] || null
}

/* ─── Left panel content ─────────────────────────────────────── */
const FEATURES = [
  { icon: "store", text: "Manage your restaurant listings from one powerful dashboard with full control." },
  { icon: "trophy", text: "Boost visibility and reach more customers through featured search results." },
  { icon: "shield", text: "Secure, fast access with your data protected every step of the way." },
]

const STATS = [
  { value: "12K+", label: "Listings" },
  { value: "95K+", label: "Monthly Users" },
  { value: "480K+", label: "Reviews" },
]

/* ─── Role option card ───────────────────────────────────────── */
const RoleCard = ({ value, label, desc, icon, selected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(value)}
    className="flex items-start gap-3 p-3.5 rounded-xl text-left w-full"
    style={{
      backgroundColor: selected ? "rgba(241,89,42,0.07)" : "#fff",
      border: `1.5px solid ${selected ? "#F1592A" : "#e5e7eb"}`,
      cursor: "pointer",
      transition: "border-color 0.15s, background 0.15s",
    }}
  >
    <span
      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
      style={{
        backgroundColor: selected ? "rgba(241,89,42,0.15)" : "#f3f4f6",
        color: selected ? "#F1592A" : "#9ca3af",
        transition: "background 0.15s, color 0.15s",
      }}
    >
      <Icon name={icon} size={15} />
    </span>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-bold leading-none mb-0.5" style={{ color: selected ? "#F1592A" : "#1a1a1a" }}>{label}</p>
      <p className="text-xs leading-snug" style={{ color: "#9ca3af" }}>{desc}</p>
    </div>
    <span
      className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5"
      style={{ borderColor: selected ? "#F1592A" : "#d1d5db", backgroundColor: selected ? "#F1592A" : "transparent" }}
    >
      {selected && <Icon name="check" size={10} />}
    </span>
  </button>
)

/* ─── Input field ────────────────────────────────────────────── */
const Field = ({ label, optional, error, icon, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold flex items-center gap-1.5" style={{ color: "#374151" }}>
      {label}
      {optional && <span className="text-xs font-normal" style={{ color: "#9ca3af" }}>(optional)</span>}
    </label>
    <div className="relative">
      {icon && (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9ca3af" }}>
          <Icon name={icon} size={15} />
        </span>
      )}
      {children}
    </div>
    {error && <p className="text-xs font-medium" style={{ color: "#ef4444" }}>{error}</p>}
  </div>
)

/* ─── Shared input style fn ──────────────────────────────────── */
const inputStyle = (hasIcon = true, hasError = false) => ({
  width: "100%",
  padding: `10px 14px 10px ${hasIcon ? "40px" : "14px"}`,
  borderRadius: "10px",
  fontSize: "14px",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color 0.15s, box-shadow 0.15s",
  backgroundColor: hasError ? "#fef2f2" : "#fff",
  border: `1.5px solid ${hasError ? "#fca5a5" : "#e5e7eb"}`,
  color: "#1a1a1a",
})

/* ─── Main Component ─────────────────────────────────────────── */
const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "viewer",
    address: { country: "", state: "", city: "" },
    password: "",
  })
  const [showPass, setShowPass] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const { register } = useUser()
  const navigate = useNavigate()

  const set = (key) => (e) => {
    setForm(p => ({ ...p, [key]: e.target.value }))
    if (errors[key]) setErrors(p => ({ ...p, [key]: "" }))
  }

  const setAddr = (key) => (e) => {
    setForm(p => ({ ...p, address: { ...p.address, [key]: e.target.value } }))
  }

  const setRole = (val) => setForm(p => ({ ...p, role: val }))

  /* Client-side field errors */
  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = "Name is required."
    if (!form.email.trim()) e.email = "Email is required."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email."
    if (!form.password || form.password.length < 6) e.password = "Password must be at least 6 characters."
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // validator from your file
    const formErr = Register_Form_Verificaton(form)
    if (formErr) { toast.error(formErr); return }

    // field-level errors
    const fieldErr = validate()
    if (Object.keys(fieldErr).length) { setErrors(fieldErr); return }

    setSubmitting(true)
    try {
      const ok = await register(form)
      if (ok) {
        toast.info("Check your email to verify your account before logging in.")
        navigate("/verify-otp", { state: { email: form.email } })
      }
    } catch (err) {
      toast.error(err?.message || "Registration failed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  /* Password strength */
  const strengthScore = (() => {
    const p = form.password
    return [p.length >= 6, /[A-Z]/.test(p), /\d/.test(p), /[^a-zA-Z0-9]/.test(p)].filter(Boolean).length
  })()
  const strengthColors = ["#ef4444", "#f97316", "#eab308", "#22c55e"]
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"]

  return (
    <div className="min-h-screen flex justify-start flex-row-reverse" style={{ backgroundColor: "#faf8f5", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Sora:wght@700;800&display=swap');
        .exo-2 { font-family: 'Sora', sans-serif; }
        .auth-input::placeholder { color: #c4bfba; }
        .auth-input:focus { border-color: #F1592A !important; box-shadow: 0 0 0 3px rgba(241,89,42,0.1); }
        .register-btn { width: 100%; padding: 12px; border-radius: 10px; border: none; background: #F1592A; color: #fff; font-size: 15px; font-weight: 700; cursor: pointer; transition: background 0.15s, transform 0.12s, box-shadow 0.15s; font-family: inherit; }
        .register-btn:hover:not(:disabled) { background: #d94820; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(241,89,42,0.28); }
        .register-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .eye-btn { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #9ca3af; padding: 0; display: flex; align-items: center; transition: color 0.15s; }
        .eye-btn:hover { color: #F1592A; }
        select.auth-input { appearance: none; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' strokeWidth='2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* ── Right Banner ─────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[52%] flex-col justify-start p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1a0800 0%, #2d0f00 50%, #0d0d0d 100%)" }}
      >
        <div className="absolute pointer-events-none" style={{ inset: 0, background: "radial-gradient(ellipse 70% 55% at 70% 40%, rgba(241,89,42,0.22) 0%, transparent 65%)", zIndex: 0 }} />
        <div className="absolute pointer-events-none" style={{ inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "50px 50px", zIndex: 0 }} />

        {/* Logo */}
        <div className="relative z-10 mb-2">
          <Link to="/"><img src="/top_logo.jpg" alt="Rank Eats" className="h-10 w-auto object-contain" /></Link>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-8">
          <div>
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
              style={{ backgroundColor: "rgba(241,89,42,0.18)", color: "#F1592A", border: "1px solid rgba(241,89,42,0.3)" }}
            >
              Join for Free
            </span>
            <h1 className="exo-2 font-bold text-white leading-tight mb-3" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
              Join<br />
              <span style={{ color: "#F1592A" }}>Rank Eats</span>
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", maxWidth: "340px" }}>
              Create your free account to discover, vote, and review — or list your restaurant and reach thousands of hungry customers.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(241,89,42,0.15)", color: "#F1592A" }}>
                  <Icon name={f.icon} size={15} />
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{f.text}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {STATS.map(s => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <span className="exo-2 font-bold text-xl" style={{ color: "#F1592A" }}>{s.value}</span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          Trusted by restaurant owners across the country
        </p>
      </div>

      {/* ── Left Form Panel ──────────────────────────────────── */}
      <div className="flex-1 flex items-start justify-center px-5 py-12 overflow-y-auto">
        <div className="w-full" style={{ maxWidth: "420px" }}>

          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex justify-center">
            <Link to="/"><img src="/top_logo.jpg" alt="Rank Eats" className="h-9 w-auto object-contain" /></Link>
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h2 className="exo-2 font-bold text-2xl mb-1" style={{ color: "#1a1a1a" }}>Create your account</h2>
            <p className="text-sm" style={{ color: "#9ca3af" }}>Fill in the details below to get started — it's free.</p>
          </div>

          {/* Form card */}
          <div
            className="rounded-2xl p-7 flex flex-col gap-5"
            style={{ backgroundColor: "#fff", border: "1.5px solid #f0ede8", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Name */}
              <Field label="Full Name" error={errors.name} icon="user">
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={set("name")}
                  className="auth-input"
                  style={inputStyle(true, !!errors.name)}
                  autoComplete="name"
                />
              </Field>

              {/* Email */}
              <Field label="Email Address" error={errors.email} icon="mail">
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set("email")}
                  className="auth-input"
                  style={inputStyle(true, !!errors.email)}
                  autoComplete="email"
                />
              </Field>

              {/* Role picker */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold" style={{ color: "#374151" }}>Register as</label>
                <div className="flex flex-col gap-2">
                  <RoleCard
                    value="viewer"
                    label="Food Lover"
                    desc="Discover, vote, and review restaurants near you."
                    icon="user"
                    selected={form.role === "viewer"}
                    onSelect={setRole}
                  />
                  <RoleCard
                    value="owner"
                    label="Restaurant Owner"
                    desc="List your restaurant, manage details, and grow your reach."
                    icon="store"
                    selected={form.role === "owner"}
                    onSelect={setRole}
                  />
                </div>
              </div>

             
                <div className="flex flex-col gap-3 p-4 rounded-xl" style={{ backgroundColor: "#fdf9f7", border: "1px solid #f0ede8" }}>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9ca3af" }}>Restaurant Location</p>
                  <Field label="Country" optional icon="mapPin">
                    <input
                      type="text"
                      placeholder="e.g. United States"
                      value={form.address.country}
                      onChange={setAddr("country")}
                      className="auth-input"
                      style={inputStyle(true, false)}
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="State">
                      <input
                        type="text"
                        placeholder="e.g. New York"
                        value={form.address.state}
                        onChange={setAddr("state")}
                        className="auth-input"
                        style={inputStyle(false, false)}
                      />
                    </Field>
                    <Field label="City">
                      <input
                        type="text"
                        placeholder="e.g. Brooklyn"
                        value={form.address.city}
                        onChange={setAddr("city")}
                        className="auth-input"
                        style={inputStyle(false, false)}
                      />
                    </Field>
                  </div>
                </div>
              

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <Field label="Password" error={errors.password} icon="lock">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={form.password}
                    onChange={set("password")}
                    className="auth-input"
                    style={{ ...inputStyle(true, !!errors.password), paddingRight: "44px" }}
                    autoComplete="new-password"
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowPass(p => !p)} tabIndex={-1}>
                    <Icon name={showPass ? "eyeOff" : "eye"} size={16} />
                  </button>
                </Field>

                {/* Strength bar */}
                {form.password && (
                  <div className="flex items-center gap-1.5 mt-1">
                    {[0, 1, 2, 3].map(i => (
                      <div
                        key={i}
                        className="flex-1 h-1.5 rounded-full"
                        style={{ backgroundColor: i < strengthScore ? strengthColors[strengthScore - 1] : "#e5e7eb", transition: "background 0.2s" }}
                      />
                    ))}
                    <span className="text-xs font-semibold ml-1 w-10 shrink-0" style={{ color: strengthColors[strengthScore - 1] || "#9ca3af" }}>
                      {strengthScore > 0 ? strengthLabels[strengthScore - 1] : ""}
                    </span>
                  </div>
                )}
              </div>

              {/* Terms note */}
              <p className="text-xs leading-relaxed" style={{ color: "#9ca3af" }}>
                By creating an account you agree to our{" "}
                <Link to="/terms" style={{ color: "#F1592A", textDecoration: "none", fontWeight: 600 }}>Terms of Use</Link>
                {" "}and{" "}
                <Link to="/privacy" style={{ color: "#F1592A", textDecoration: "none", fontWeight: 600 }}>Privacy Policy</Link>.
              </p>

              {/* Submit */}
              <button type="submit" disabled={submitting} className="register-btn">
                {submitting
                  ? <span className="flex items-center justify-center gap-2">
                    <span style={{ width: 15, height: 15, border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                    Creating account...
                  </span>
                  : "Create Account"
                }
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ backgroundColor: "#f0ede8" }} />
              <span className="text-xs" style={{ color: "#c4bfba" }}>or</span>
              <div className="flex-1 h-px" style={{ backgroundColor: "#f0ede8" }} />
            </div>

            {/* Login CTA */}
            <p className="text-center text-sm" style={{ color: "#6b7280" }}>
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold"
                style={{ color: "#F1592A", textDecoration: "none" }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register