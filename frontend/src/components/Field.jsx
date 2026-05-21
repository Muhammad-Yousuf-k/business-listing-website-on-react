import Icon from './Icon'

const Field = ({ label, optional, error, icon, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold flex items-center gap-1.5" style={{ color: "#374151" }}>
      {label}
      {optional && <span className="text-xs font-normal" style={{ color: "#9ca3af" }}>(optional)</span>}
    </label>
    <div className="relative">
      {icon && (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9ca3af" }}>
          <Icon name={icon} size={15} />
        </span>
      )}
      {children}
    </div>
    {error && <p className="text-xs font-medium" style={{ color: "#ef4444" }}>{error}</p>}
  </div>
)

export default Field