import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SquaresPlusIcon, Bars3Icon } from "@heroicons/react/24/outline"
import { useCookies } from "react-cookie"
import useAccountStore from "../zustand/account.store"
import useCrypto from "../hooks/crypto.hooks"

export default function Navbar() {
  const navigate = useNavigate()
  const [cookies, setCookies, removeCookie] = useCookies(["token"])
  const [toggleMenu, setToggleMenu] = useState(false)
  const [isLogged, setIsLogged] = useState(false)
  const { decrypt } = useCrypto()
  const zustandAccount = useAccountStore((state) => state.account)
  const zustandStoreAccount = useAccountStore((state) => state.storeAccount)
  const decryptedData = zustandAccount ? JSON.parse(decrypt(zustandAccount)) : {} // because can't parse empty string. Use for when not logged

  const LoginRegisterUrl = () => {
    return (
      <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </>
    )
  }

  const logoutUser = () => {
    zustandStoreAccount(undefined)
    removeCookie("token") // to remove entire row of cookie
    navigate("/login")
  }

  useEffect(() => {
    //   if (cookies.token !== undefined) {
    //     setIsLogged(true)
    //   } else {
    //     setIsLogged(false)
    //   }

    // simplified version of the above condition code
    setIsLogged(cookies.token !== undefined)
  }, [cookies.token])

  return (
    <nav className="sticky top-0 bg-gray-200 text-primary z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex mx-auto justify-between w-5/6">
          {/* Primary menu and logo */}
          <div className="flex items-center gap-16 my-12">
            {/* logo */}
            <div>
              <Link to="/" className="flex gap-1 font-bold text-gray-700 items-center">
                <SquaresPlusIcon className="h-6 w-6 text-primary-color1" />
                <span className="text-primary-color1">Blog Post</span>
              </Link>
            </div>
            {/* primary */}
            <div className="hidden lg:flex gap-8">
              <Link to="/">Home</Link>
              {isLogged ? (
                <>
                  <Link to="/post">Post</Link>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* secondary */}
          <div className="flex gap-6">
            <div className="xs:flex items-center self-center gap-8">
              {isLogged ? (
                <>
                  <div className="items-center">
                    <span>Hi, {decryptedData.first_name}</span>
                  </div>
                  <div className="hidden lg:flex">
                    <button type="button" className="rounded-full border-solid border-2 border-gray-300 py-2 px-4 hover:bg-gray-600 hover:text-gray-100" onClick={logoutUser}>
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="gap-5 hidden lg:flex">{LoginRegisterUrl()}</div>
              )}
            </div>
            {/* Mobile navigation toggle */}
            <div className="lg:hidden flex items-center text-primary-color1">
              <button onClick={() => setToggleMenu(!toggleMenu)}>
                <Bars3Icon className="h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* mobile navigation */}
      <div className={`fixed z-40 w-full bg-primary-color4 overflow-hidden flex flex-col lg:hidden gap-12 origin-top duration-700 ${!toggleMenu ? "h-0" : "h-full"}`}>
        <div className="px-8">
          <div className="flex flex-col gap-5 font-bold tracking-wider mt-3 text-primary-color1" onClick={() => setToggleMenu(!toggleMenu)}>
            <Link to="/">Home</Link>
            {isLogged ? (
              <>
                <Link to="/post">Post</Link>
                <a onClick={logoutUser}>Logout</a>
              </>
            ) : (
              <div className="flex flex-col gap-5">{LoginRegisterUrl()}</div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
