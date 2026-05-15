import { useNavigate } from "react-router-dom";


const Btntwo = ({text, path}) => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(`/${path}`)}   className=" no-wrap rounded-lg bg-(--accent-color) hover:bg-(--primary-color) text-[15px] px-5 py-2 font-medium text-white">
                                {text}
                            </button>
  )
}

export default Btntwo