import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { format } from "date-fns"
import Loader from "../../components/Loader"

export default function ViewPostPage() {
  const [loading, setLoading] = useState(true) // Set loading to true initially
  const [postInfo, setPostInfo] = useState([])

  // get the id from the url :id
  const { id } = useParams()

  const formattedDateCreated = (date_created) => {
    return format(new Date(date_created), "MMMM d, yyyy h:mm a")
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/post/${id}`)
        console.log(response.data)
        setPostInfo(response.data.data)
      } catch (error) {
        console.log("Error:", error)
      } finally {
        setLoading(false) // Set loading to false after data fetching (whether it succeeds or fails)
      }
    }
    fetchData()
  }, [])

  return (
    <section className="max-w-7xl mx-auto relative bg-gray-200 pt-2">
      <div className="mx-auto w-5/6 bg-gray-100 p-5 rounded-lg pb-9 mb-5 md:pb-10 lg:pb-7">
        {loading ? (
          <Loader />
        ) : (
          <div>
            <h1 className="text-xl font-bold md:text-3xl">{postInfo.title}</h1>
            <div className="my-5 flex flex-col items-baseline sm:flex-row md:gap-2">
              <strong>{postInfo.author.first_name + " " + postInfo.author.last_name}</strong>
              <span className="text-gray-500 text-xs"> {formattedDateCreated(postInfo.date_created)}</span>
            </div>
            <div className="flex justify-center items-center mb-5">
              <img className="h-auto max-w-xs rounded-lg  mx-auto md:max-w-md lg:max-w-lg" src={import.meta.env.VITE_COVER_PATH + postInfo.cover_path} alt="cover photo" />
            </div>

            <div>
              <div className="" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
