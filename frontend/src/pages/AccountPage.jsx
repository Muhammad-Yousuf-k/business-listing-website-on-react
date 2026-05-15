import { useState, useRef, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import CommonHeroSec from "../components/CommonHeroSec"
import api from "../api/interceptors"
import { toast } from "react-toastify"

/* ─── Icons ──────────────────────────────────────────────────── */
const Icon = ({ name, size = 18 }) => {
  const icons = {
    user:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    lock:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
    mapPin:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    camera:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
    eye:      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    eyeOff:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
    check:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    mail:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    shield:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    upload:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>,
    spinner:  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>,
  }
  return icons[name] || null
}

/* ─── Field wrapper ──────────────────────────────────────────── */
const Field = ({ label, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold" style={{ color: "#374151" }}>{label}</label>
    {children}
    {error && <p className="text-xs font-medium" style={{ color: "#ef4444" }}>{error}</p>}
  </div>
)

const inputCls = (err) => ({
  backgroundColor: err ? "#fef2f2" : "#fff",
  border: `1.5px solid ${err ? "#fca5a5" : "#e5e7eb"}`,
  color: "#1a1a1a",
  borderRadius: "10px",
  padding: "10px 14px",
  fontSize: "14px",
  outline: "none",
  width: "100%",
  fontFamily: "inherit",
  transition: "border-color 0.15s, box-shadow 0.15s",
})

/* ─── Password field ─────────────────────────────────────────── */
const PasswordField = ({ label, value, onChange, error, placeholder }) => {
  const [show, setShow] = useState(false)
  return (
    <Field label={label} error={error}>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{ ...inputCls(!!error), paddingRight: "44px" }}
          className="account-input"
        />
        <button
          type="button"
          onClick={() => setShow(p => !p)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
          style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0 }}
        >
          <Icon name={show ? "eyeOff" : "eye"} size={16} />
        </button>
      </div>
    </Field>
  )
}

/* ─── Section Card ───────────────────────────────────────────── */
const SectionCard = ({ icon, title, subtitle, children }) => (
  <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#fff", border: "1.5px solid #f0ede8", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
    <div className="flex items-center gap-3 px-6 py-4" style={{ borderBottom: "1px solid #f0ede8", backgroundColor: "#fdf9f7" }}>
      <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(241,89,42,0.1)", color: "#F1592A" }}>
        <Icon name={icon} size={17} />
      </span>
      <div>
        <p className="font-bold text-sm" style={{ color: "#1a1a1a" }}>{title}</p>
        {subtitle && <p className="text-xs" style={{ color: "#9ca3af" }}>{subtitle}</p>}
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
)

/* ─── Save Button ────────────────────────────────────────────── */
const SaveBtn = ({ loading, label = "Save Changes", onClick }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white"
    style={{ backgroundColor: loading ? "#f8a98d" : "#F1592A", border: "none", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.15s", minWidth: 140 }}
    onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = "#d94820" }}
    onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = "#F1592A" }}
  >
    {loading
      ? <><span style={{ animation: "spin 0.8s linear infinite", display: "inline-block" }}><Icon name="spinner" size={14} /></span> Saving...</>
      : <><Icon name="check" size={14} /> {label}</>
    }
  </button>
)

/* ─── Main Account Page ──────────────────────────────────────── */
export default function AccountPage() {
  const { user, userAvatar } = useContext(AuthContext)

  /* Avatar */
  const fileRef = useRef(null)
  const [avatarPreview, setAvatarPreview] = useState(userAvatar || "/unknownuser.png")
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarLoading, setAvatarLoading] = useState(false)

  /* Profile form */
  const [profile, setProfile] = useState({ name: user?.name || "", email: user?.email || "" })
  const [profileErrors, setProfileErrors] = useState({})
  const [profileLoading, setProfileLoading] = useState(false)

  /* Password form */
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" })
  const [passwordErrors, setPasswordErrors] = useState({})
  const [passwordLoading, setPasswordLoading] = useState(false)

  /* Address form */
  const [address, setAddress] = useState({
    country: user?.address?.country || "",
    state:   user?.address?.state   || "",
    city:    user?.address?.city    || "",
  })
  const [addressLoading, setAddressLoading] = useState(false)

  /* ── Avatar handlers ──────────────────────────────────────── */
  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) { toast.error("Image must be under 2MB"); return }
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const handleAvatarSave = async () => {
    if (!avatarFile) return
    setAvatarLoading(true)
    try {
      const form = new FormData()
      form.append("avatar", avatarFile)
      await api.patch("/auth-api/update-avatar", form, { headers: { "Content-Type": "multipart/form-data" } })
      toast.success("Avatar updated successfully")
      setAvatarFile(null)
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update avatar")
    } finally {
      setAvatarLoading(false)
    }
  }

  /* ── Profile handlers ─────────────────────────────────────── */
  const validateProfile = () => {
    const e = {}
    if (!profile.name.trim()) e.name = "Name is required."
    if (!profile.email.trim()) e.email = "Email is required."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) e.email = "Enter a valid email."
    return e
  }

  const handleProfileSave = async () => {
    const e = validateProfile()
    if (Object.keys(e).length) { setProfileErrors(e); return }
    setProfileErrors({})
    setProfileLoading(true)
    try {
      await api.patch("/auth-api/update-profile", { name: profile.name, email: profile.email })
      toast.success("Profile updated successfully")
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update profile")
    } finally {
      setProfileLoading(false)
    }
  }

  /* ── Password handlers ────────────────────────────────────── */
  const validatePassword = () => {
    const e = {}
    if (!passwords.current) e.current = "Current password is required."
    if (!passwords.next) e.next = "New password is required."
    else if (passwords.next.length < 6) e.next = "Password must be at least 6 characters."
    if (!passwords.confirm) e.confirm = "Please confirm your new password."
    else if (passwords.next !== passwords.confirm) e.confirm = "Passwords do not match."
    return e
  }

  const handlePasswordSave = async () => {
    const e = validatePassword()
    if (Object.keys(e).length) { setPasswordErrors(e); return }
    setPasswordErrors({})
    setPasswordLoading(true)
    try {
      await api.patch("/auth-api/change-password", { currentPassword: passwords.current, newPassword: passwords.next })
      toast.success("Password changed successfully")
      setPasswords({ current: "", next: "", confirm: "" })
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to change password")
    } finally {
      setPasswordLoading(false)
    }
  }

  /* ── Address handlers ─────────────────────────────────────── */
  const handleAddressSave = async () => {
    setAddressLoading(true)
    try {
      await api.patch("/auth-api/update-address", address)
      toast.success("Address updated successfully")
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update address")
    } finally {
      setAddressLoading(false)
    }
  }

  /* ── Helpers ──────────────────────────────────────────────── */
  const setP = (field) => (e) => {
    setProfile(p => ({ ...p, [field]: e.target.value }))
    if (profileErrors[field]) setProfileErrors(p => ({ ...p, [field]: "" }))
  }
  const setPw = (field) => (e) => {
    setPasswords(p => ({ ...p, [field]: e.target.value }))
    if (passwordErrors[field]) setPasswordErrors(p => ({ ...p, [field]: "" }))
  }
  const setA = (field) => (e) => setAddress(p => ({ ...p, [field]: e.target.value }))

  /* ── Initials fallback ────────────────────────────────────── */
  const initials = (user?.name || "U").split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()

  return (
    <div style={{ backgroundColor: "#faf8f5", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Sora:wght@700;800&display=swap');
        .exo-2 { font-family: 'Sora', sans-serif; }
        .account-input:focus { border-color: #F1592A !important; box-shadow: 0 0 0 3px rgba(241,89,42,0.1); }
        .account-input::placeholder { color: #c4bfba; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .avatar-ring:hover .avatar-overlay { opacity: 1 !important; }
        select.account-input { appearance: none; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' strokeWidth='2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; }
      `}</style>

      <CommonHeroSec pageName="Account" heading="My Account" para="Manage your profile, security, and location preferences." />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── LEFT SIDEBAR ────────────────────────────────── */}
          <div className="flex flex-col gap-5 lg:col-span-1">

            {/* Avatar Card */}
            <div
              className="rounded-2xl p-6 flex flex-col items-center gap-4 text-center"
              style={{ backgroundColor: "#fff", border: "1.5px solid #f0ede8", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
            >
              {/* Avatar ring */}
              <div
                className="avatar-ring relative cursor-pointer"
                style={{ width: 96, height: 96 }}
                onClick={() => fileRef.current?.click()}
              >
                {avatarPreview && avatarPreview !== "/unknownuser.png"
                  ? <img src={avatarPreview} alt="avatar" className="w-full h-full rounded-full object-cover" style={{ border: "3px solid #F1592A" }} />
                  : (
                    <div className="w-full h-full rounded-full flex items-center justify-center exo-2 font-bold text-2xl" style={{ backgroundColor: "rgba(241,89,42,0.12)", color: "#F1592A", border: "3px solid #F1592A" }}>
                      {initials}
                    </div>
                  )
                }
                {/* Overlay */}
                <div
                  className="avatar-overlay absolute inset-0 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(0,0,0,0.45)", opacity: 0, transition: "opacity 0.18s" }}
                >
                  <Icon name="camera" size={20} />
                </div>
              </div>

              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />

              <div>
                <p className="font-bold text-base exo-2" style={{ color: "#1a1a1a" }}>{user?.name || "User"}</p>
                <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>{user?.email || ""}</p>
                <span
                  className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mt-2 capitalize"
                  style={{ backgroundColor: "rgba(241,89,42,0.1)", color: "#F1592A" }}
                >
                  {user?.role || "viewer"}
                </span>
              </div>

              <button
                onClick={() => fileRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold"
                style={{ backgroundColor: "#fdf5f2", color: "#F1592A", border: "1.5px solid rgba(241,89,42,0.2)", cursor: "pointer", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#fde8de"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#fdf5f2"}
              >
                <Icon name="upload" size={15} />
                Change Photo
              </button>

              {avatarFile && (
                <SaveBtn loading={avatarLoading} label="Upload Photo" onClick={handleAvatarSave} />
              )}

              <p className="text-xs" style={{ color: "#c4bfba" }}>JPG or PNG, max 2MB</p>
            </div>

            {/* Account info badges */}
            <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ backgroundColor: "#fff", border: "1.5px solid #f0ede8" }}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#9ca3af" }}>Account Status</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm" style={{ color: "#374151" }}>
                  <Icon name="mail" size={14} />
                  Email
                </div>
                <span
                  className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: user?.isVerified ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                    color: user?.isVerified ? "#059669" : "#ef4444",
                  }}
                >
                  {user?.isVerified ? "Verified" : "Unverified"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm" style={{ color: "#374151" }}>
                  <Icon name="shield" size={14} />
                  Role
                </div>
                <span className="text-xs font-bold capitalize" style={{ color: "#F1592A" }}>{user?.role || "viewer"}</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT CONTENT ────────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Profile Info */}
            <SectionCard icon="user" title="Profile Information" subtitle="Update your name and email address">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Full Name" error={profileErrors.name}>
                  <input
                    className="account-input"
                    style={inputCls(!!profileErrors.name)}
                    value={profile.name}
                    onChange={setP("name")}
                    placeholder="John Doe"
                  />
                </Field>
                <Field label="Email Address" error={profileErrors.email}>
                  <input
                    className="account-input"
                    style={inputCls(!!profileErrors.email)}
                    type="email"
                    value={profile.email}
                    onChange={setP("email")}
                    placeholder="john@example.com"
                  />
                </Field>
              </div>
              <div className="mt-5 flex items-center justify-between flex-wrap gap-3" style={{ borderTop: "1px solid #f0ede8", paddingTop: "16px" }}>
                <p className="text-xs" style={{ color: "#9ca3af" }}>Changes to your email may require re-verification.</p>
                <SaveBtn loading={profileLoading} onClick={handleProfileSave} />
              </div>
            </SectionCard>

            {/* Change Password */}
            <SectionCard icon="lock" title="Change Password" subtitle="Must be at least 6 characters">
              <div className="flex flex-col gap-5">
                <PasswordField
                  label="Current Password"
                  value={passwords.current}
                  onChange={setPw("current")}
                  error={passwordErrors.current}
                  placeholder="Enter current password"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <PasswordField
                    label="New Password"
                    value={passwords.next}
                    onChange={setPw("next")}
                    error={passwordErrors.next}
                    placeholder="Min. 6 characters"
                  />
                  <PasswordField
                    label="Confirm New Password"
                    value={passwords.confirm}
                    onChange={setPw("confirm")}
                    error={passwordErrors.confirm}
                    placeholder="Repeat new password"
                  />
                </div>

                {/* Strength indicator */}
                {passwords.next && (
                  <div className="flex flex-col gap-1.5">
                    <p className="text-xs font-semibold" style={{ color: "#9ca3af" }}>Password strength</p>
                    <div className="flex gap-1.5">
                      {(() => {
                        const len = passwords.next.length
                        const hasUpper = /[A-Z]/.test(passwords.next)
                        const hasNum = /\d/.test(passwords.next)
                        const hasSpecial = /[^a-zA-Z0-9]/.test(passwords.next)
                        const score = [len >= 6, hasUpper, hasNum, hasSpecial].filter(Boolean).length
                        const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e"]
                        const labels = ["Weak", "Fair", "Good", "Strong"]
                        return (
                          <>
                            {[0, 1, 2, 3].map(i => (
                              <div
                                key={i}
                                className="flex-1 h-1.5 rounded-full"
                                style={{ backgroundColor: i < score ? colors[score - 1] : "#e5e7eb", transition: "background 0.2s" }}
                              />
                            ))}
                            <span className="text-xs font-semibold ml-1" style={{ color: colors[score - 1] || "#9ca3af" }}>
                              {score > 0 ? labels[score - 1] : ""}
                            </span>
                          </>
                        )
                      })()}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-5 flex justify-end" style={{ borderTop: "1px solid #f0ede8", paddingTop: "16px" }}>
                <SaveBtn loading={passwordLoading} label="Update Password" onClick={handlePasswordSave} />
              </div>
            </SectionCard>

            {/* Address */}
            <SectionCard icon="mapPin" title="Location & Address" subtitle="Used to personalise restaurant recommendations">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <Field label="Country">
                  <input
                    className="account-input"
                    style={inputCls(false)}
                    value={address.country}
                    onChange={setA("country")}
                    placeholder="e.g. United States"
                  />
                </Field>
                <Field label="State / Province">
                  <input
                    className="account-input"
                    style={inputCls(false)}
                    value={address.state}
                    onChange={setA("state")}
                    placeholder="e.g. New York"
                  />
                </Field>
                <Field label="City">
                  <input
                    className="account-input"
                    style={inputCls(false)}
                    value={address.city}
                    onChange={setA("city")}
                    placeholder="e.g. Brooklyn"
                  />
                </Field>
              </div>
              <div className="mt-5 flex items-center justify-between flex-wrap gap-3" style={{ borderTop: "1px solid #f0ede8", paddingTop: "16px" }}>
                <p className="text-xs" style={{ color: "#9ca3af" }}>Your address is never shared publicly.</p>
                <SaveBtn loading={addressLoading} label="Save Address" onClick={handleAddressSave} />
              </div>
            </SectionCard>

          </div>
        </div>
      </div>
    </div>
  )
}
