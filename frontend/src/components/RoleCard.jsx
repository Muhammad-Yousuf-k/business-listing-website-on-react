import Icon from './Icon'

const RoleCard = ({ value, label, desc, icon, selected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(value)}
    className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition ${selected ? "border-[#F1592A] bg-orange-50" : "border-gray-200 bg-white"
      }`}
  >
    <span
      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${selected ? "bg-orange-100 text-[#F1592A]" : "bg-gray-100 text-gray-400"
        }`}
    >
      <Icon name={icon} size={15} />
    </span>

    <div className="min-w-0 flex-1">
      <p
        className={`mb-0.5 text-sm font-bold leading-none ${selected ? "text-[#F1592A]" : "text-[#1a1a1a]"
          }`}
      >
        {label}
      </p>
      <p className="text-xs leading-snug text-gray-400">{desc}</p>
    </div>

    <span
      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${selected
        ? "border-[#F1592A] bg-[#F1592A]"
        : "border-gray-300 bg-transparent"
        }`}
    >
      {selected && <Icon name="check" size={10} />}
    </span>
  </button>
)

export default RoleCard