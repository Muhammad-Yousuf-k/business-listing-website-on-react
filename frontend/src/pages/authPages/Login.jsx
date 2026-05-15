import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { toast } from "react-toastify";
import { Login_Form_Verificaton } from "../../validator/auth_form_verify";

// ─── Icons ────────────────────────────────────────────────────────────────────

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// ─── Constants ────────────────────────────────────────────────────────────────

const FEATURES = [
  "Manage your restaurant listing easily from one dashboard. Update details, images, menu, and contact information anytime.",
  "Increase your visibility and get more customers by appearing in top search results and featured sections.",
  "Secure and fast access to your account with protected data and smooth dashboard experience anytime you log in.",
];

// ─── Shared Input Styles ──────────────────────────────────────────────────────

const inputClass =
  "w-full pl-10 pr-4 py-2.5 border border-[var(--color-border,#E5E7EB)] rounded-lg bg-white text-sm text-[var(--color-text,#111827)] outline-none transition focus:border-[var(--color-primary,#085DB7)] focus:ring-2 focus:ring-[var(--color-primary,#085DB7)]/10 placeholder:text-gray-400";

// ─── Field Wrapper ────────────────────────────────────────────────────────────

const Field = ({ label, icon, children }) => (
  <div>
    <label className="text-xs font-medium text-[var(--color-text-muted,#6B7280)]">{label}</label>
    <div className="relative mt-1">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted,#9CA3AF)] pointer-events-none">
        {icon}
      </span>
      {children}
    </div>
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = Login_Form_Verificaton(email, password);
    if (result !== null) {
      toast.error(result);
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await login(email, password);
      if (!res) {
        toast.error("Login failed.");
      } else {
        toast.success("Logged in successfully.");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.message || "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[var(--color-bg,#F7F8F9)]">
      {/* ── Left Banner Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-[url('/login-banner.png')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white leading-tight mb-3">
            Welcome Back to Rank Eats
          </h1>
          <p className="text-white/70 text-sm mb-8">
            Sign in to manage your restaurant listings, update your profile, and track your business performance.
          </p>
          <ul className="space-y-4">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-white/80 text-sm">
                <span className="mt-0.5 text-[var(--color-accent,#38BDF8)]">✦</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative z-10 text-white/40 text-xs">
          Used by restaurant owners across the country
        </p>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-[var(--color-text,#111827)] mb-1">
            Login to Rank Eats
          </h2>
          <p className="text-sm text-[var(--color-text-muted,#6B7280)] mb-8">
            Welcome back, please login to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <Field label="Email Address" icon={<MailIcon />}>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </Field>

            {/* Password */}
            <Field label="Password" icon={<LockIcon />}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted,#9CA3AF)] hover:text-[var(--color-primary,#085DB7)] transition"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </Field>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-lg text-white text-sm font-semibold bg-[var(--color-primary,#085DB7)] hover:bg-[var(--color-primary-dark,#064a91)] transition disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? "Logging in..." : "Log in"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm mt-6 text-[var(--color-text-muted,#6B7280)]">
            New here?{" "}
            <Link to="/register" className="text-[var(--color-primary,#085DB7)] font-medium hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;