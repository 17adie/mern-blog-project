import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import axios from "axios"

export default function Register() {
  const initialFormData = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  }

  const [formData, setFormData] = useState(initialFormData)

  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const registerUser = async (e) => {
    e.preventDefault()
    const { first_name, last_name, email, password } = formData
    try {
      const { data } = await axios.post("/api/auth/register", {
        first_name,
        last_name,
        email,
        password,
      })
      if (data.status) {
        toast.success(data.message)
        setFormData(initialFormData) // reset input fields
        navigate("/login")
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
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-primary">Create new account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={registerUser}>
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-primary">
                First name
              </label>
              <div className="mt-2">
                <input id="first_name" name="first_name" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-color4 sm:text-sm sm:leading-6" value={formData.first_name} onChange={handleInputChange} />
              </div>
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-primary">
                Last name
              </label>
              <div className="mt-2">
                <input id="last_name" name="last_name" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-color4 sm:text-sm sm:leading-6" value={formData.last_name} onChange={handleInputChange} />
              </div>
            </div>

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
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
