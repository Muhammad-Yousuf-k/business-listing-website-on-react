
const Stats = ({ data = [
  {
    label: "unknown Stats",
    value: 0,
  },
  {
    label: "unknown Stats",
    value: 0,
  },
  {
    label: "unknown Stats",
    value: 0,
  },
  {
    label: "unknown Stats",
    value: 0,
  },
] }) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {data.map((stat, idx) => (
        <div
          key={idx}
          className="p-5 rounded-xl shadow-sm"
          style={{ backgroundColor: "var(--bg-card)" }}
        >
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {stat.label}
          </p>
          <p className="text-3xl font-bold mt-2">
            {stat.value ?? 0}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
