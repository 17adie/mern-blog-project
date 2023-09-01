import { Outlet, Navigate } from "react-router-dom"
import { useCookies } from "react-cookie"

const PrivateRoutes = () => {
  const [cookies, setCookies, removeCookie] = useCookies(["token"])

  return !cookies.token ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoutes
