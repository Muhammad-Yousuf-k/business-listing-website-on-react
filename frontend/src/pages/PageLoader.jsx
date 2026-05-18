// src/components/PageLoader.jsx

const PageLoader = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "var(--black-color, #0d0d0d)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "28px",
        zIndex: 9999,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@600&family=Sora:wght@700;800&display=swap');

        @keyframes re-spin {
          0%   { transform: rotate(0deg);   opacity: 1; }
          50%  { transform: rotate(180deg); opacity: 0.6; }
          100% { transform: rotate(360deg); opacity: 1; }
        }

        @keyframes re-pulse {
          0%, 100% { opacity: 0.15; transform: scale(1);    }
          50%       { opacity: 0.35; transform: scale(1.12); }
        }

        @keyframes re-dot {
          0%, 80%, 100% { transform: scaleY(0.4); opacity: 0.3; }
          40%            { transform: scaleY(1);   opacity: 1;   }
        }

        @keyframes re-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }

        .re-logo-text {
          font-family: 'Sora', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: -0.5px;
          animation: re-fade-in 0.4s ease both;
        }

        .re-tagline {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          animation: re-fade-in 0.4s 0.1s ease both;
          opacity: 0;
        }

        .re-ring-outer {
          animation: re-spin 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .re-ring-pulse {
          animation: re-pulse 1.4s ease-in-out infinite;
        }

        .re-dot {
          width: 3px;
          border-radius: 2px;
          background: #F1592A;
          animation: re-dot 1s ease-in-out infinite;
        }
      `}</style>

      {/* ── Spinner + Logo lockup ───────────────────────────── */}
      <div style={{ position: "relative", width: 96, height: 96, display: "flex", alignItems: "center", justifyContent: "center" }}>

        {/* Outer pulsing halo */}
        <div
          className="re-ring-pulse"
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(241,89,42,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Spinning arc */}
        <svg
          className="re-ring-outer"
          width={96}
          height={96}
          viewBox="0 0 96 96"
          fill="none"
          style={{ position: "absolute" }}
        >
          {/* Track */}
          <circle cx="48" cy="48" r="42" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
          {/* Arc */}
          <circle
            cx="48"
            cy="48"
            r="42"
            stroke="#F1592A"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="264"
            strokeDashoffset="200"
          />
        </svg>

        {/* Center logo mark */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "14px",
            backgroundColor: "rgba(241,89,42,0.12)",
            border: "1.5px solid rgba(241,89,42,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            {/* Fork + star hybrid mark */}
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              fill="#F1592A"
              opacity="0.9"
            />
          </svg>
        </div>
      </div>

      {/* ── Wordmark ────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <p className="re-logo-text">
          <span style={{ color: "#F1592A" }}>Rank</span>
          <span style={{ color: "#f0f0f0" }}> Eats</span>
        </p>
        <p className="re-tagline" style={{ color: "rgba(255,255,255,0.35)" }}>
          Loading your experience
        </p>
      </div>

      {/* ── Dot progress bar ────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 20 }}>
        {[0, 1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="re-dot"
            style={{
              height: `${10 + i * 3}px`,
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default PageLoader
