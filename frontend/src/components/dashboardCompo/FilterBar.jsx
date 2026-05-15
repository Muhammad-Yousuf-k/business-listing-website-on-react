import { useNavigate } from "react-router-dom";
import Btntwo from "../small compo/Btn-two";

const FilterBar = ({
  search,
  setSearch,
  filters,
  setFilters,
  selects = [],
  gridCols = "md:grid-cols-6",
  isButton = false,
  ButtonText,
  ButtonPath,
}) => {
  const navigate = useNavigate();

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div
      className={`grid grid-cols-1 ${gridCols} gap-4 p-4 rounded-xl border`}
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
      }}
    >
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search"
        className="px-3 py-2 rounded-lg text-sm border outline-none"
        style={{
          backgroundColor: "var(--bg-page)",
          borderColor: "var(--border-default)",
          color: "var(--text-main)",
        }}
      />

      {selects?.map((select) => (
        <select
          key={select.key}
          value={filters?.[select.key] ?? "all"}
          onChange={(e) => handleFilterChange(select.key, e.target.value)}
          className="px-3 py-2 rounded-lg text-sm border outline-none"
          style={{
            backgroundColor: "var(--bg-page)",
            borderColor: "var(--border-default)",
            color: "var(--text-main)",
          }}
        >
          {select.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}

      {isButton && ButtonPath && (
        <>
          <Btntwo text={ButtonText} path={ButtonPath} />
        </>
      )}
    </div>
  );
};

export default FilterBar;
