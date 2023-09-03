import Post from "../../mongodb/models/Post.js"

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, summary, content } = req.body
    const { fileName } = req.locals
    const userID = req.id // from authentication middleware

    const requiredFields = [title, summary, content]
    if (requiredFields.some((field) => !field.trim())) {
      return res.json({
        status: false,
        message: "Please fill out all required fields.",
      })
    }

    if (!fileName) {
      return res.json({
        status: false,
        message: "Cover photo is required.",
      })
    }

    // create new blog
    const post = await Post.create({
      title,
      summary,
      cover_path: fileName,
      content,
      author: userID,
    })

    return res.status(200).json({
      status: true,
      post: post,
      message: "New blog is added successfully!",
    })
  } catch (error) {
    // error prompt for Post Model. e.q. "Path `cover_path` is required."
    if (error.name === "ValidationError") {
      const errorMessage = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ")
      return res.status(400).json({ status: false, error: errorMessage })
    } else {
      console.log({ error })
      return res.status(500).json({ status: false, error: "An error occurred" })
    }
  }
}

// Get all posts by a specific user
const getUserPost = async (req, res) => {
  const { page, limit } = req.query
  const skip = (page - 1) * limit
  const id = req.id

  try {
    const userPost = await Post.find({ author: id }).populate("author", { first_name: 1, last_name: 1, _id: 0 }).sort({ date_created: -1 }).skip(skip).limit(parseInt(limit)) // Exclude _id, include first_name and last_name

    return res.json({
      status: true,
      data: userPost,
    })
  } catch (error) {
    console.log({ error })
    return res.json({ status: false, route: "get user post", error: error })
  }
}

// Get all post
const getAllPosts = async (req, res) => {
  const { page, limit } = req.query
  const skip = (page - 1) * limit

  try {
    // const userPost = await Post.find().populate("author", { first_name: 1, last_name: 1, _id: 0 }).sort({ date_created: -1 }) // Exclude _id, include first_name and last_name
    const userPost = await Post.find().populate("author", { first_name: 1, last_name: 1, _id: 0 }).sort({ date_created: -1 }).skip(skip).limit(parseInt(limit))
    return res.json({
      status: true,
      data: userPost,
    })
  } catch (error) {
    console.log({ error })
    return res.json({ status: false, route: "get all post", error: error })
  }
}

// Get a post by ID
const getPost = async (req, res) => {
  try {
    const { id } = req.params
    const postDoc = await Post.findById(id).populate("author", { first_name: 1, last_name: 1, _id: 0 }) // Exclude _id, include first_name and last_name
    return res.json({
      status: true,
      data: postDoc,
    })
  } catch (error) {
    console.log(error)
    return res.json({ status: false, route: "get post", error: error })
  }
}

// Delete a post
const deletePost = async (req, res) => {
  try {
    const id = req.params.id
    const deletedPost = await Post.findByIdAndDelete(id)

    if (!deletedPost) {
      return res.json({ status: false, message: "Item not found" })
    }

    return res.json({ status: true, data: deletedPost, message: "Post deleted successfully" })
  } catch (error) {
    console.log(error)
    return res.json({ status: false, route: "delete post", error: error })
  }
}

export { createPost, getUserPost, getAllPosts, getPost, deletePost }
