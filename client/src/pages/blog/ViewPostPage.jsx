import { useState, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useCookies } from "react-cookie"
import axios from "axios"
import { format } from "date-fns"
import Loader from "../../components/Loader"
import NoDataFound from "../../components/NoDataFound"
import EditDeleteButtons from "../../components/EditDeleteButtons"
import { toast } from "react-hot-toast"
import { confirmAlert } from "react-confirm-alert" // Import
import "react-confirm-alert/src/react-confirm-alert.css" // Import css

export default function ViewPostPage() {
  const [loading, setLoading] = useState(true) // Set loading to true initially
  const [postInfo, setPostInfo] = useState([])
  const [pageNotFound, setPageNotFound] = useState(false)
  const [postOwner, setPostOwner] = useState(null)
  const [cookies, setCookies, removeCookie] = useCookies(["token"])

  // get the id from the url :id
  const { id } = useParams()

  // source: https://ui.dev/react-router-pass-props-to-link
  // to get the declared state in previous Link
  const location = useLocation()

  // if (location.state) {
  //   const location = useLocation()
  //   const { postOwner } = location.state
  // } else {

  // }

  const formattedDateCreated = (date_created) => {
    return format(new Date(date_created), "MMMM d, yyyy h:mm a")
  }

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // set condition if the location.state is undefined. e.q when you update the post then navigate(`/post/${id}`)
        if (location.state) {
          const { postOwner } = location.state
          setPostOwner(postOwner)
        }

        const response = await axios.get(`/api/post/${id}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })

        if (response.data.status) {
          setPostInfo(response.data.data)
        } else {
          setPageNotFound(true)
        }
      } catch (error) {
        console.log("Error:", error)
      } finally {
        setLoading(false) // Set loading to false after data fetching (whether it succeeds or fails)
      }
    }
    fetchData()
  }, [])

  const handleDeletePost = async (postID) => {
    const delePost = async () => {
      try {
        const { data } = await axios.delete(`/api/post/${postID}`)
        console.log(data)

        if (data.status) {
          toast.success(data.message)
          navigate("/post")
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        console.log({ error })
      }
    }

    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to remove this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => delePost(),
        },
        {
          label: "No",
          onClick: () => {
            console.log("No")
            return
          },
        },
      ],
    })
  }

  return (
    <section className="max-w-7xl mx-auto relative bg-gray-200 pt-2">
      <div className="mx-auto w-5/6 bg-gray-100 p-5 rounded-lg pb-9 mb-5 md:pb-10 lg:pb-7">
        {loading ? (
          <Loader />
        ) : pageNotFound ? (
          <NoDataFound />
        ) : (
          <div>
            {postOwner ? <EditDeleteButtons id={id} handleDeletePost={handleDeletePost} /> : ""}
            <h1 className="text-xl font-bold md:text-3xl mt-5">{postInfo.title}</h1>
            <div className="my-5 flex flex-col items-baseline sm:flex-row md:gap-2">
              <strong>{postInfo.author.first_name + " " + postInfo.author.last_name}</strong>
              <span className="text-gray-500 text-xs"> {formattedDateCreated(postInfo.date_created)}</span>
            </div>
            <div className="flex justify-center items-center mb-5">
              <img className="h-auto rounded-lg  mx-auto md:max-w-md lg:max-w-lg" src={import.meta.env.VITE_COVER_PATH + postInfo.cover_path} alt="cover photo" />
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
