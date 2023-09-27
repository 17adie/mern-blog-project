import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import axios from "axios"
import useAccountStore from "../zustand/account.store"
import { useCookie } from "../hooks/useCookie"

export default function Login() {
  // Zustand
  const zustandStoreAccount = useAccountStore((state) => state.storeAccount)

  // User form
  const initialFormData = {
    email: "",
    password: "",
  }

  const [formData, setFormData] = useState(initialFormData)

  const navigate = useNavigate()

  const { setCookie } = useCookie("token")

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const loginUser = async (e) => {
    e.preventDefault()
    const { email, password } = formData

    // Define your cookie options
    const cookieOptions = {
      path: "/", // Path for the cookie
      // secure: true, // Use HTTPS-only cookie
      // sameSite: "none", // Same-site attribute (strict, lax, none)
    }

    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      })
      if (data.status) {
        // Store Account info
        zustandStoreAccount(data.user)
        toast.success(data.message)
        setFormData(initialFormData) // reset input fields
        setCookie(data.token, cookieOptions)
        navigate("/post")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-1 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primary">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={loginUser}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-primary">
                Email address
              </label>
              <div className="mt-2">
                <input id="email" name="email" type="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-color4 sm:text-sm sm:leading-6" value={formData.email} onChange={handleInputChange} />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-primary">
                Password
              </label>
              <div className="mt-2">
                <input id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-color4 sm:text-sm sm:leading-6" value={formData.password} onChange={handleInputChange} />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-primary-color1 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-color2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-color1">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
