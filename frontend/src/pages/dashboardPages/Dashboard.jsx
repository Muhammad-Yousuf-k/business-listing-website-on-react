import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/dashboardCompo/Header.jsx";
import Sidebar from "../../components/dashboardCompo/Sidebar";
import Stats from "../../components/dashboardCompo/Stats";
import OverView from "../../components/dashboardCompo/OverView.jsx";

// ── Icons ──
const ActivityIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
)

const TableIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M3 15h18M9 3v18" />
  </svg>
)

const EmptyIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8M12 8v8" />
  </svg>
)

// ── Section card wrapper ──
const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl ${className}`}
    style={{
      backgroundColor: "var(--bg-card)",
      border: "1px solid var(--border-default)",
    }}
  >
    {children}
  </div>
)

// ── Card header ──
const CardHeader = ({ icon, title, action }) => (
  <div
    className="flex items-center justify-between px-5 py-4 border-b"
    style={{ borderColor: "var(--border-default)" }}
  >
    <div className="flex items-center gap-2.5">
      <span
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          backgroundColor: "color-mix(in srgb, var(--primary) 12%, transparent)",
          color: "var(--primary)",
        }}
      >
        {icon}
      </span>
      <h2 className="text-sm font-semibold" style={{ color: "var(--text-main)" }}>
        {title}
      </h2>
    </div>
    {action}
  </div>
)

// ── Activity item ──
const ActivityItem = ({ description, index }) => {
  const colors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"]
  const color = colors[index % colors.length]

  return (
    <li className="flex items-start gap-3 py-2.5" style={{ borderBottom: "1px solid var(--border-default)" }}>
      <span
        className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
        style={{ backgroundColor: color }}
      />
      <p className="text-sm leading-snug" style={{ color: "var(--text-main)" }}>
        {description}
      </p>
    </li>
  )
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const recentActivity = [
    { description: "John Doe submitted a new listing for 'Coffee Shop'." },
    { description: "Jane Smith updated the listing for 'Book Store'." },
    { description: "Michael Brown deleted the listing for 'Gym'." },
    { description: "Emily Davis submitted a new listing for 'Restaurant'." },
    { description: "David Wilson updated the listing for 'Salon'." },
  ]

  const recentReviews = [
    {
      name: "yousuf",
      rating: 2,
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione debitis officia illum unde commodi est earum cum, praesentium, deleniti sit quaerat possimus eveniet ex fugiat animi exercitationem illo beatae inventore. David Wilson updated the listing for 'Salon'.",
    },
    {
      name: "yousuf",
      rating: 1,
      description: "David Wilson updated the listing for 'Salon'.",
    },
    {
      name: "yousuf",
      rating: 5,
      description: "David Wilson updated the listing for 'Salon'.",
    },
    {
      name: "yousuf",
      rating: 3,
      description: "David Wilson updated the listing for 'Salon'.",
    },
  ]


  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-page)", color: "var(--text-main)" }}
    >
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="lg:ml-64 px-4 py-4 lg:px-6 lg:py-6 space-y-6 min-h-screen">

        {/* Header */}
        <Header
          title="Dashboard"
          onMenu={() => setSidebarOpen(true)}
          isBack={false}
          onBack={() => navigate("/dashboard")}
          isBTN={true}
          isBTNText={"Add Listing"}
          onBTN={"/owner/listing/create"}
        />

        {/* Lead stats */}
        <Stats />

        <div className="w-full min-h-50 flex gap-3">
          <div className="w-[60%]">
            <Card>
              <CardHeader icon={<ActivityIcon />} title="Latest Reviews" />
              <div className="px-5 py-2">
                {recentReviews.length === 0 ? (
                  <div
                    className="flex flex-col items-center justify-center py-12 gap-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <EmptyIcon />
                    <p className="text-sm">No News today</p>
                  </div>
                ) : (
                  <ul className="grid grid-cols-2 grid-rows-3 gap-1">
                    {recentReviews.slice(0, 6).map((e, idx) => (
                      <div key={idx} onClick={() => { navigate(`/reviews/${e._id}`) }} className="border border-(--border-default) w-ful min-h-40 rounded-2xl p-4 bg-[#F3F4F6]">
                        <h2 className="font-bold text-[16px] capitalize ">{e.name}</h2>
                        {/* Rating */}
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${i < e.rating ? "text-yellow-400" : "text-gray-300"
                                }`}
                            >
                              ★
                            </span>
                          ))}

                          <span className="text-sm text-gray-500">
                            ({e.rating}/5)
                          </span>
                        </div>
                        <p className="text-[13px] line-clamp-4 ">{e.description}</p>



                      </div>
                    ))}
                  </ul>
                )}
              </div>
            </Card>

          </div>
          <div className="w-[40%]">
            <Card>
              <CardHeader icon={<ActivityIcon />} title="News Letter" />
              <div className="px-5 py-2">
                {recentActivity.length === 0 ? (
                  <div
                    className="flex flex-col items-center justify-center py-12 gap-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <EmptyIcon />
                    <p className="text-sm">No News today</p>
                  </div>
                ) : (
                  <ul>
                    {recentActivity.map((e, idx) => (
                      <ActivityItem key={idx} description={e.description} index={idx} />
                    ))}
                  </ul>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Today's activity */}



      </main>
    </div>
  );
};

export default Dashboard;