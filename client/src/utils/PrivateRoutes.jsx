import { Outlet, Navigate } from "react-router-dom"
import useAccountStore from "../zustand/account.store"
import { useCookies } from "react-cookie"

const PrivateRoutes = () => {
  const [cookies, setCookies, removeCookie] = useCookies(["token"])
  const zustandStoreAccount = useAccountStore((state) => state.storeAccount)

  // If token is expired clear data in zustand
  if (cookies.token === undefined) {
    zustandStoreAccount(undefined)
  }

  return cookies.token ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
