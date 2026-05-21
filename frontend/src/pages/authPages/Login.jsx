import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { toast } from "react-toastify"
import { Login_Form_Verificaton } from "../../validator/auth_form_verify"
import Icon from "../../components/Icon"
import Field from "../../components/Field"


/* ─── Features list ──────────────────────────────────────────── */
const FEATURES = [
  { icon: "trophy", text: "Manage your restaurant listing, update details, images, and menu from one clean dashboard." },
  { icon: "users", text: "Reach more hungry customers by appearing in top search results and featured sections." },
  { icon: "shield", text: "Secure and fast access — your data is protected and your dashboard is always ready." },
]

/* ─── Stats ──────────────────────────────────────────────────── */
const STATS = [
  { value: "12K+", label: "Listings" },
  { value: "95K+", label: "Monthly Users" },
  { value: "480K+", label: "Reviews" },
]


/* ─── Main Component ─────────────────────────────────────────── */
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const { login, resetPassword } = useUser()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = Login_Form_Verificaton(email, password)
    if (err) { toast.error(err); return }

    setSubmitting(true)
    try {
      const ok = await login(email, password)
      if (ok) {
        navigate("/")
      }
    } finally {
      setSubmitting(false)
    }
  }

  async function handleResetPassword() {
    if (!email || !password) { return toast.error("add your email and new password") }
    const res = await resetPassword(email)

    if (!res) {
      toast.error("Something Weng Wrong, try again later")
    }
    if (res) {
      toast.success("OTP sent to email")
      navigate("/verify-otp", {
        state: {
          email: email,
          purpose: "reset_password",
          NewPassword: password,
        },
      });
    }
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#faf8f5", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Sora:wght@700;800&display=swap');
        .exo-2 { font-family: 'Sora', sans-serif; }
        .auth-input { width: 100%; padding: 10px 14px 10px 40px; border-radius: 10px; font-size: 14px; outline: none; font-family: inherit; transition: border-color 0.15s, box-shadow 0.15s; background: #fff; border: 1.5px solid #e5e7eb; color: #1a1a1a; }
        .auth-input::placeholder { color: #c4bfba; }
        .auth-input:focus { border-color: #F1592A; box-shadow: 0 0 0 3px rgba(241,89,42,0.1); }
        .auth-input.pr-extra { padding-right: 44px; }
        .login-btn { width: 100%; padding: 12px; border-radius: 10px; border: none; background: #F1592A; color: #fff; font-size: 15px; font-weight: 700; cursor: pointer; transition: background 0.15s, transform 0.12s, box-shadow 0.15s; font-family: inherit; }
        .login-btn:hover:not(:disabled) { background: #d94820; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(241,89,42,0.28); }
        .login-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .eye-btn { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #9ca3af; padding: 0; display: flex; align-items: center; transition: color 0.15s; }
        .eye-btn:hover { color: #F1592A; }
        .feature-item { display: flex; align-items: flex-start; gap: 12px; }
      `}</style>

      {/* ── Left Banner ──────────────────────────────────────── */}
      <div
        className="hidden lg:flex lg:w-[52%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1a0800 0%, #2d0f00 50%, #0d0d0d 100%)" }}
      >
        {/* Radial glow */}
        <div
          className="absolute pointer-events-none"
          style={{ inset: 0, background: "radial-gradient(ellipse 70% 55% at 30% 40%, rgba(241,89,42,0.22) 0%, transparent 65%)", zIndex: 0 }}
        />
        {/* Grid texture */}
        <div
          className="absolute pointer-events-none"
          style={{ inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "50px 50px", zIndex: 0 }}
        />

        {/* Logo */}
        <div className="relative z-10 mb-2.5">
          <Link to="/">
            <img src="/top_logo.jpg" alt="Rank Eats" className="h-10 w-auto object-contain" />
          </Link>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col gap-8">
          <div>
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
              style={{ backgroundColor: "rgba(241,89,42,0.18)", color: "#F1592A", border: "1px solid rgba(241,89,42,0.3)" }}
            >
              Restaurant Platform
            </span>
            <h1 className="exo-2 font-bold text-white leading-tight mb-3" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
              Welcome back to<br />
              <span style={{ color: "#F1592A" }}>Rank Eats</span>
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", maxWidth: "340px" }}>
              Sign in to manage your listings, track performance, and reach more hungry customers every day.
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-5">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-item">
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(241,89,42,0.15)", color: "#F1592A" }}
                >
                  <Icon name={f.icon} size={15} />
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{f.text}</p>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div
            className="flex gap-8 pt-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            {STATS.map(s => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <span className="exo-2 font-bold text-xl" style={{ color: "#F1592A" }}>{s.value}</span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <p className="relative z-10 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          Trusted by restaurant owners across the country
        </p>
      </div>

      {/* ── Right Form Panel ─────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full" style={{ maxWidth: "400px" }}>

          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex justify-center">
            <Link to="/">
              <img src="/top_logo.jpg" alt="Rank Eats" className="h-9 w-auto object-contain" />
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="exo-2 font-bold text-2xl mb-1" style={{ color: "#1a1a1a" }}>
              Sign in to your account
            </h2>
            <p className="text-sm" style={{ color: "#9ca3af" }}>
              Welcome back — let's get you logged in.
            </p>
          </div>

          {/* Form card */}
          <div
            className="rounded-2xl p-7 flex flex-col gap-5"
            style={{ backgroundColor: "#fff", border: "1.5px solid #f0ede8", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Email */}
              <Field label="Email Address" icon="mail">
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="auth-input"
                  required
                  autoComplete="email"
                />
              </Field>

              {/* Password */}
              <Field label="Password" icon="lock">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="auth-input pr-extra"
                  required
                  autoComplete="current-password"
                />
                <button type="button" className="eye-btn" onClick={() => setShowPass(p => !p)} tabIndex={-1}>
                  <Icon name={showPass ? "eyeOff" : "eye"} size={16} />
                </button>
              </Field>

              {/* Forgot password */}
              <div className="flex justify-end -mt-2">
                <Link
                  onClick={handleResetPassword}
                  className="text-xs font-semibold"
                  style={{ color: "#F1592A", textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button type="submit" disabled={submitting} className="login-btn">
                {submitting
                  ? <span className="flex items-center justify-center gap-2">
                    <span style={{ width: 15, height: 15, border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                    Logging in...
                  </span>
                  : "Log in"
                }
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ backgroundColor: "#f0ede8" }} />
              <span className="text-xs" style={{ color: "#c4bfba" }}>or</span>
              <div className="flex-1 h-px" style={{ backgroundColor: "#f0ede8" }} />
            </div>

            {/* Register CTA */}
            <p className="text-center text-sm" style={{ color: "#6b7280" }}>
              New to Rank Eats?{" "}
              <Link
                to="/register"
                className="font-bold"
                style={{ color: "#F1592A", textDecoration: "none" }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
              >
                Create a free account
              </Link>
            </p>
          </div>

          {/* Trust note */}
          <div className="flex items-center justify-center gap-5 mt-6">
            {[
              { icon: "shield", text: "Secure login" },
              { icon: "check", text: "No spam" },
              { icon: "star", text: "Free to join" },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-1.5">
                <span style={{ color: "#F1592A" }}><Icon name={item.icon} size={12} /></span>
                <span className="text-xs" style={{ color: "#9ca3af" }}>{item.text}</span>
              </div>
            ))}
          </div>

          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    </div>
  )
}

export default Login