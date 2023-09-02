import { useEffect, useState } from "react"
import axios from "axios"
import PostCard from "../components/PostCard"
import NoPost from "../components/NoPost"
import Loader from "../components/Loader"

export default function Home() {
  const [loading, setLoading] = useState(true) // Set loading to true initially
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/post/posts")
        setUserPosts(response.data.data)
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
                    <PostCard key={post._id} {...post} />
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
