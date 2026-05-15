import { Navigate } from "react-router-dom"
import {useUser} from "../hooks/useUser"

const NotForLoggedUserRoute = ({ children }) => {
  const { isLoggedIn } = useUser()

  if (isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return children
}

export default NotForLoggedUserRoute
