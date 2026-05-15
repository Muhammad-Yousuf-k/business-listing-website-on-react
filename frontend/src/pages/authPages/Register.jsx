import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { toast } from "react-toastify";
import { Register_Form_Verificaton } from "../../validator/auth_form_verify";


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

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// ─── Constants ────────────────────────────────────────────────────────────────

const FEATURES = [
  "Manage your restaurant listings from one powerful dashboard with full control.",
  "Boost visibility and reach more customers through featured search results.",
  "Secure, fast access with your data protected every step of the way.",
];

// ─── Shared Input Styles ──────────────────────────────────────────────────────

const inputClass =
  "w-full pl-10 pr-4 py-2.5 border border-[var(--color-border,#E5E7EB)] rounded-lg bg-white text-sm text-[var(--color-text,#111827)] outline-none transition focus:border-[var(--color-primary,#085DB7)] focus:ring-2 focus:ring-[var(--color-primary,#085DB7)]/10 placeholder:text-gray-400";

const selectClass =
  "w-full pl-10 pr-4 py-2.5 border border-[var(--color-border,#E5E7EB)] rounded-lg bg-white text-sm text-[var(--color-text,#111827)] outline-none transition focus:border-[var(--color-primary,#085DB7)] focus:ring-2 focus:ring-[var(--color-primary,#085DB7)]/10";

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

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "viewer",
    address: { country: "", state: "", city: "" },
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useUser();
  const navigate = useNavigate();

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const setAddress = (key) => (e) =>
    setForm((prev) => ({
      ...prev,
      address: { ...prev.address, [key]: e.target.value },
    }));

  const validate = () => {
    const { name, email, password, address } = form;
    if (!name.trim()) return "Name is required.";
    if (!email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email.";
    if (!password || password.length < 6) return "Password must be at least 6 characters.";
    // address is optional per the model defaults, but country is good practice for owners
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // i have to fix validate

    const result = Register_Form_Verificaton(form);
    if (result) {
      toast.error(result);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await register(form);
      if (res) {
        toast.info("Verify your email before logging in.");
        navigate("/verify-otp", { state: { email: form.email } });
      }
    } catch (err) {

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-row-reverse bg-[var(--color-bg,#F7F8F9)]">
      {/* ── Left Banner Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-[url('/login-banner.png')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white leading-tight mb-3">
            Join Rank Eats
          </h1>
          <p className="text-white/70 text-sm mb-8">
            Create your account to manage restaurant listings, grow your reach, and track performance.
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
      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-sm">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-[var(--color-text,#111827)] mb-1">
            Create an Account
          </h2>
          <p className="text-sm text-[var(--color-text-muted,#6B7280)] mb-8">
            Fill in the details below to get started
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <Field label="Full Name" icon={<UserIcon />}>
              <input
                type="text"
                placeholder="John Doe"
                value={form.name}
                required
                onChange={set("name")}
                className={inputClass}
              />
            </Field>

            {/* Email */}
            <Field label="Email Address" icon={<MailIcon />}>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                required
                onChange={set("email")}
                className={inputClass}
              />
            </Field>

            {/* Role */}
            <Field label="Register as" icon={<ShieldIcon />}>
              <select
                value={form.role}
                onChange={set("role")}
                required
                className={selectClass}
              >
                <option value="viewer">Viewer</option>
                <option value="owner">Owner</option>
              </select>
            </Field>

            {/* Address */}
            <div>
              <label className="text-xs font-medium text-[var(--color-text-muted,#6B7280)]">
                Address <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <div className="mt-1 space-y-2">
                {/* Country */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted,#9CA3AF)] pointer-events-none">
                    <MapPinIcon />
                  </span>
                  <input
                    type="text"
                    placeholder="Country"
                    value={form.address.country}
                    onChange={setAddress("country")}
                    className={inputClass}
                  />
                </div>
                {/* State + City side by side */}
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="State"
                    value={form.address.state}
                    onChange={setAddress("state")}
                    className="w-full px-3 py-2.5 border border-[var(--color-border,#E5E7EB)] rounded-lg bg-white text-sm text-[var(--color-text,#111827)] outline-none transition focus:border-[var(--color-primary,#085DB7)] focus:ring-2 focus:ring-[var(--color-primary,#085DB7)]/10 placeholder:text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={form.address.city}
                    onChange={setAddress("city")}
                    className="w-full px-3 py-2.5 border border-[var(--color-border,#E5E7EB)] rounded-lg bg-white text-sm text-[var(--color-text,#111827)] outline-none transition focus:border-[var(--color-primary,#085DB7)] focus:ring-2 focus:ring-[var(--color-primary,#085DB7)]/10 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <Field label="Password" icon={<LockIcon />}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Min. 6 characters"
                value={form.password}
                required
                onChange={set("password")}
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
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm mt-6 text-[var(--color-text-muted,#6B7280)]">
            Already have an account?{" "}
            <Link to="/login" className="text-[var(--color-primary,#085DB7)] font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;