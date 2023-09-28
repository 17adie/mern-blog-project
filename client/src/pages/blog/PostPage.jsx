import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useCookie } from "../../hooks/useCookie"
import axios from "axios"
import PostCard from "../../components/PostCard"
import NoPost from "../../components/NoPost"
import Loader from "../../components/Loader"
import { toast } from "react-hot-toast"
import { confirmAlert } from "react-confirm-alert" // Import
import "react-confirm-alert/src/react-confirm-alert.css" // Import css

export default function PostPage() {
  const [loading, setLoading] = useState(true) // Set loading to true initially
  const [userPosts, setUserPosts] = useState([])
  const [postOwner, setPostOwner] = useState("")
  const [page, setPage] = useState(1) // Add page state
  const [limit] = useState(5) // Adjust this to your desired limit
  const [hasMoreData, setHasMoreData] = useState(true) // Track if there's more data
  const { cookieValue } = useCookie("token")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/post/user-posts?page=${page}&limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${cookieValue}`,
          },
        })
        // console.log(response.data)
        if (response.data.data.length === 0 || response.data.data.length < limit) {
          setHasMoreData(false) // No more data to load
        }
        setUserPosts([...userPosts, ...response.data.data])
        setPostOwner(response.data.postOwner)
      } catch (error) {
        console.log("Error:", error)
      } finally {
        setLoading(false) // Set loading to false after data fetching (whether it succeeds or fails)
      }
    }
    fetchData()
  }, [page, limit])

  const handleLoadMore = () => {
    setPage(page + 1)
  }

  const handleDeletePost = async (postID) => {
    const delePost = async () => {
      try {
        const { data } = await axios.delete(`/api/post/${postID}`, {
          headers: {
            Authorization: `Bearer ${cookieValue}`,
          },
        })
        // console.log(data)

        if (data.status) {
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }

        setUserPosts(userPosts.filter((post) => post._id !== postID))
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
            // console.log("No")
            return
          },
        },
      ],
    })
  }

  return (
    <section className="max-w-7xl mx-auto relative bg-gray-200 pt-2">
      <div className="mx-auto w-5/6 bg-gray-100 p-5 rounded-lg pb-9 mb-5 md:pb-10 lg:pb-7">
        <div className="w-full">
          <div className="mx-auto flex justify-between ">
            <h1 className="text-xl font-semibold pl-3 text-primary relative pt-1">
              Blog Post
              <span className="absolute left-0 top-1/2 w-1 h-6 bg-primary-color2 transform -translate-y-3"></span>
            </h1>
            <div>
              <Link to="/create-post" className="flex justify-center px-3 py-1.5 text-sm font-semibold leading-6 text-white bg-primary-color1 rounded-md shadow-sm hover:bg-primary-color2">
                Create post
              </Link>
            </div>
          </div>
        </div>
        <div className="container mx-auto">
          {loading ? (
            <Loader />
          ) : (
            <>
              {userPosts.length === 0 ? (
                <NoPost />
              ) : (
                <>
                  {userPosts.map((post, i) => (
                    <PostCard key={post._id} {...post} handleDeletePost={handleDeletePost} postOwner={postOwner} />
                  ))}
                  {hasMoreData && <button onClick={handleLoadMore}>Load More</button>}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
