import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterBar from "../../components/dashboardCompo/FilterBar.jsx";

import ListingCard from "../../components/ListingCard"


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

const ListingManagement = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState("")
    const [filters, setFilters] = useState({
        category: "all",
        status: "all",
    });

    const FILTER_OPTIONS = [
        {
            key: "category",
            options: [
                { value: "all", label: "All Category" },
                { value: "New", label: "New" },
            ],
        },
        {
            key: "status",
            options: [
                { value: "all", label: "All status" },
                { value: "New", label: "New" },
            ],
        },

    ];

    const normalizedSearch = search.trim().toLowerCase();

    //   const filteredLeads = useMemo(() => {
    //      if (!leads.length) return [];
    //      return leads.filter((lead) => {
    //        const matchesSearch =
    //          lead.name?.toLowerCase().includes(normalizedSearch) ||
    //          lead.email?.toLowerCase().includes(normalizedSearch);
    //        const matchesDisposition =
    //          filters.disposition === "all" || lead.disposition === filters.disposition;
    //        const matchesService =
    //          filters.service === "all" || lead.service === filters.service;
    //        const matchesLocation =
    //          filters.location === "all" || lead.location === filters.location;
    //        const matchesType =
    //          filters.type === "all" || lead.type === filters.type;

    //        return matchesSearch && matchesDisposition && matchesService && matchesLocation && matchesType;
    //      });
    //    }, []);


    return (
        <div
            className="min-h-screen"
            style={{ backgroundColor: "var(--bg-page)", color: "var(--text-main)" }}
        >
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 px-4 py-4 lg:px-6 lg:py-6 space-y-6 min-h-screen">

                {/* Header */}
                <Header
                    title="Listing Management"
                    onMenu={() => setSidebarOpen(true)}
                    isBack={false}
                    onBack={() => navigate("/dashboard")}
                    isBTN={true}
                    isBTNText={"Add Listing"}
                    onBTN={"/owner/listing/create"}
                />

                {/* Lead stats */}
                <Stats />
                <FilterBar
                    search={search}
                    setSearch={setSearch}
                    filters={filters}
                    setFilters={setFilters}
                    gridCols="md:grid-cols-4"
                    isButton={true}
                    ButtonText="Add Listing"
                    ButtonPath="/owner/listing/create"
                    selects={FILTER_OPTIONS}
                />

                <div className="w-full min-h-50 flex justify-center items-center flex-wrap gap-3 mt-10">
                    {[1, 2, 3, 4].map(() => (
                        <ListingCard isDashboard={true} />
                    ))}
                </div>

                {/* Today's activity */}



            </main>
        </div>
    );
};

export default ListingManagement;