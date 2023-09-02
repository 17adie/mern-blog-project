import { useEffect, useState } from "react"
import axios from "axios"
import PostCard from "../components/PostCard"
import NoPost from "../components/NoPost"
import Loader from "../components/Loader"

export default function Home() {
  const [loading, setLoading] = useState(true) // Set loading to true initially
  const [userPosts, setUserPosts] = useState([])
  const [page, setPage] = useState(1) // Add page state
  const [limit] = useState(5) // Adjust this to your desired limit
  const [hasMoreData, setHasMoreData] = useState(true) // Track if there's more data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/post/posts?page=${page}&limit=${limit}`)
        // console.log(response.data.data)
        if (response.data.data.length === 0) {
          setHasMoreData(false) // No more data to load
        } else {
          setUserPosts([...userPosts, ...response.data.data])
        }
      } catch (error) {
        console.log("Error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [page, limit])

  const handleLoadMore = () => {
    setPage(page + 1)
  }

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
