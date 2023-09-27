import { useState, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useCookie } from "../../hooks/useCookie"
import { toast } from "react-hot-toast"
import axios from "axios"
import PostForm from "../../components/PostForm"

export default function CreatePostPage() {
  const formRef = useRef(null) // Create a ref for the form
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { cookieValue } = useCookie("token")
  const initialFormData = {
    title: "",
    summary: "",
    content: "",
    file: null,
  }

  const [formData, setFormData] = useState(initialFormData)

  // Handle change in normal input text box
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // submit data to the api
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { title, summary, file, content } = formData

    /*
     # Check if the content only contains empty paragraphs.
     In this regular expression, \s* matches any number of whitespace characters 
     (including spaces, tabs, etc.).
     e.q. <p>   </p>
    */
    const isEmptyContentInsideSpace = content.replace(/<p>\s*<\/p>/g, "").trim().length === 0
    const isEmptyContent = content.replace(/<p><br><\/p>/g, "").trim().length === 0

    // Check for required fields
    if (!title.trim() || !summary.trim() || isEmptyContent || isEmptyContentInsideSpace || file === null) {
      toast.error("Please fill out all required fields.")
      setLoading(false)
      return
    }

    // Create a FormData object. Use this approach to be able to save the file data
    const formDataToSend = new FormData()
    formDataToSend.set("title", title)
    formDataToSend.set("summary", summary)
    formDataToSend.set("file", file) // Append the file to the FormData
    formDataToSend.set("content", content)

    try {
      const { data } = await axios.post("/api/post/posts", formDataToSend, {
        headers: {
          Authorization: `Bearer ${cookieValue}`,
        },
      })
      console.log({ data })
      if (data.status) {
        toast.success(data.message)
        setLoading(false)
        navigate("/post")
      } else {
        toast.error(data.message)
        setLoading(false)
      }
    } catch (error) {
      // catch error for server e.q. offline server
      if (error.code == "ERR_NETWORK") {
        toast.error(error.message)
      }

      // catch error for model required field.
      if (error.code == "ERR_BAD_REQUEST") {
        toast.error(error.message)
      }

      console.log({ error })
      setLoading(false)
    }
  }

  return (
    <section className="max-w-7xl mx-auto bg-gray-200 pt-2">
      <div className="mx-auto w-5/6 bg-gray-100 p-5 rounded-lg pb-24 mb-5 md:pb-10 lg:pb-7">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold leading-7 pl-3 text-primary relative">
            Create Post
            <span className="absolute left-0 top-1/2 w-1 h-5 bg-primary-color2 transform -translate-y-1/2"></span>
          </h1>
          {/* Button section */}
          <div className="flex gap-x-3">
            <Link to="/post" className="text-sm font-semibold leading-6 items-baseline text-primary pt-1">
              Cancel
            </Link>
            {/* use requestSubmit() instead of submit(), because submit() ignored form validations and javascript conditions, while requestSubmit() is not */}
            <button type="submit" onClick={() => formRef.current.requestSubmit()} className={`rounded-md bg-primary-color1 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-primary-color2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-color4 ${loading ? "cursor-not-allowed opacity-25" : ""}`} disabled={loading}>
              {loading ? "Saving.." : "Save"}
            </button>
          </div>
        </div>
        <PostForm onSubmit={handleSubmit} formRef={formRef} formData={formData} handleInputChange={handleInputChange} setFormData={setFormData}></PostForm>
      </div>
    </section>
  )
}
