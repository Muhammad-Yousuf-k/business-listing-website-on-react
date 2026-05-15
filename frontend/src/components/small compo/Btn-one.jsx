import { useNavigate } from "react-router-dom";

const Btnone = ({ text,path }) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(`/${path}`)} className="w30 no-wrap text-[15px] rounded-lg border border-gray-300 text-(--secondary-color) hover:text-(--black-color) px-5 py-2 font-medium hover:bg-gray-100">
      {text}
    </button>
  )
}

export default Btnone