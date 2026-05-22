import { useLocation, useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { Link } from "react-router-dom";
import Btntwo from "../small compo/Btn-two";


// ── Icons ──
const DashboardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
)


const AssignIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const AnalyticsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
  </svg>
)

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

const LogOutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const AssignTasksIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M3 15h6" /><path d="M6 12v6" />
  </svg>
)

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, user } = useUser()

  // ── Menu config ──
  let menuItems = []
  if (user?.role === "admin") {
    menuItems = [
      { label: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
      { label: "Listing Management", path: "/admin/listing-management", icon: <AssignIcon /> },
      { label: "Listing For Approval", path: "/admin/listing-for-approval", icon: <AssignTasksIcon /> },
      { label: "Set Events", path: "/admin/events", icon: <AssignTasksIcon /> },
    ]
  } else if (user?.role === "owner") {
    menuItems = [
      { label: "Dashboard", path: "/owner/dashboard", icon: <DashboardIcon /> },
      { label: "Listing Management", path: "/owner/listing-management", icon: <AssignIcon /> },
    ]
  }



  const handleNav = (path) => {
    navigate(path)
    onClose()
  }

  return (
    <>
      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 flex flex-col transform transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        style={{
          backgroundColor: "var(--bg-card)",
          borderRight: "1px solid var(--border-default)",
        }}
      >
        {/* Brand header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0"
          style={{ borderColor: "var(--border-default)" }}
        >
          <Link to="/">
            <div className="flex items-center gap-2.5">
              <div
                className=" w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <img src="/pin logo.png" alt="" />
              </div>
              <span className="font-bold text-base tracking-tight" style={{ color: "var(--text-main)" }}>
                Rank Eats
              </span>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:opacity-60 transition-opacity"
            style={{ color: "var(--text-muted)" }}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          <p
            className="px-3 pb-2 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-muted)", opacity: 0.6 }}
          >
            Menu
          </p>

          {menuItems.map((item) => {
            const isActive = location.pathname === item.path

            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-150"
                style={{
                  backgroundColor: isActive
                    ? "color-mix(in srgb, var(--primary) 12%, transparent)"
                    : "transparent",
                  color: isActive ? "var(--primary)" : "var(--text-muted)",
                  fontWeight: isActive ? 600 : 400,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "color-mix(in srgb, var(--text-muted) 8%, transparent)"
                    e.currentTarget.style.color = "var(--text-main)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent"
                    e.currentTarget.style.color = "var(--text-muted)"
                  }
                }}
              >
                {/* Active indicator bar */}
                <span
                  className="absolute left-0 w-0.5 h-5 rounded-r-full transition-all duration-150"
                  style={{
                    backgroundColor: isActive ? "var(--primary)" : "transparent",
                    marginLeft: "-12px",
                  }}
                />
                <span
                  className="flex-shrink-0"
                  style={{ color: isActive ? "var(--primary)" : "var(--text-muted)", opacity: isActive ? 1 : 0.7 }}
                >
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>

                {/* Active dot */}
                {isActive && (
                  <span
                    className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "var(--primary)" }}
                  />
                )}
              </button>
            )
          })}
          {/* renew reminder */}
          {user?.role === "owner" && (
            <div className="box w-full rounded h-50 border border-(--border-default) flex flex-col justify-center p-5 bg-[#F3F4F6]">
              <DashboardIcon />
              <h2 className="font-bold text-[16px]">Plan about to expire</h2>
              <p className="text-[15px]">Enjoy 10% off when renewing your plan today.</p>
              <Btntwo text="Upgrade Plan" path={"/"} />

            </div>
          )}
        </nav>

        {/* User footer */}
        <div
          className="px-3 py-4 border-t flex-shrink-0"
          style={{ borderColor: "var(--border-default)" }}
        >
          {/* User info */}
          <div className="flex items-center gap-3 px-3 py-2.5 mb-2 rounded-xl"
            style={{ backgroundColor: "color-mix(in srgb, var(--text-muted) 6%, transparent)" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ backgroundColor: "var(--primary)" }}
            >
              <img src={user?.avatar} alt="" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate uppercase" style={{ color: "var(--text-main)" }}>
                {user?.name || "User"}
              </p>
              <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                {user?.role || "Member"}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "color-mix(in srgb, #e11d48 10%, transparent)"
              e.currentTarget.style.color = "#e11d48"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.color = "var(--text-muted)"
            }}
          >
            <LogOutIcon />
            Log out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
    </>
  )
}

export default Sidebar