const OverView = ({ title = "Overview", stage = [], Stats = {} }) => {
    return (
        <div
            className="p-5 rounded-xl border"
            style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-default)",
            }}
        >
            <h2
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: "var(--text-muted)" }}
            >
                {title}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {stage.map((s) => (
                    <div
                        key={s}
                        className="flex flex-col gap-0.5 p-3 rounded-lg border"
                        style={{
                            borderColor: "var(--border-default)",
                            backgroundColor: "var(--bg-page)",
                        }}
                    >
                        <p
                            className="text-xs font-medium uppercase tracking-wide truncate"
                            style={{ color: "var(--text-muted)" }}
                        >
                            {s}
                        </p>
                        <p
                            className="text-xl font-bold tabular-nums"
                            style={{ color: "var(--text-main)" }}
                        >
                            {Stats[s] ?? 0}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OverView;