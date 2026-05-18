import { Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"

const ButtonOne = ({
  title = "title",
  icon = false,
  path = "",
  onClick = null,
  isInverted = false
}) => {

  const buttonContent = (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex shrink-0 items-center gap-2 self-center rounded-[10px]
        border-[1.5px]
        bg-transparent
        px-7 py-3
        text-[15px] font-semibold
        transition-all duration-150
        hover:border-(--accent-color)
        hover:bg-[rgba(241,89,42,0.06)]
        hover:text-(--accent-color)
        sm:self-auto

        ${
          isInverted
            ? "border-[var(--white-color)] text-[var(--white-color)]"
            : "border-[var(--gray-color)] text-[var(--semi-black-color)]"
        }
      `}
    >
      {title}

      {icon && (
        <svg
          width={15}
          height={15}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )}
    </button>
  )

  if (path?.includes("#")) {
    return (
      <HashLink smooth to={path}>
        {buttonContent}
      </HashLink>
    )
  }

  if (path) {
    return (
      <Link to={path}>
        {buttonContent}
      </Link>
    )
  }

  return buttonContent
}

export default ButtonOne