import { Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
import Icon from "../components/Icon"

const ButtonTwo = ({
  title = "title",
  icon = null,
  iconName = null,
  iconSize = 15,
  path = "",
  loading = false,
  onClick = null,
  isSubmited = false,
  isSubmitedText = "Submitted"
}) => {

  const buttonContent = (
  <button
    type="button"
    onClick={onClick}
    className="
      flex items-center gap-2
      rounded-[10px]
      bg-(--accent-color)
      px-7 py-3
      text-[15px] font-bold
      text-white
      transition-all duration-150
      hover:-translate-y-[1px]
      hover:bg-(--accent-color)
    "
  >
    {icon === "left" && (
      <Icon name={iconName} size={iconSize} />
    )}

    {isSubmited ? isSubmitedText : title}

    {icon === "right" && (
      <Icon name={iconName} size={iconSize} />
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

export default ButtonTwo


 
