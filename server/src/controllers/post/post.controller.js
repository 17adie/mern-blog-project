import Post from "../../mongodb/models/Post.js"

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

const getPost = async (req, res) => {
  try {
    const id = req.id
    const userPost = await Post.find({ author: id }).populate("author", ["first_name", "last_name"]).sort({ date_created: -1 })

    return res.json({
      status: true,
      data: userPost,
    })
  } catch (error) {
    console.log({ error })
  }
}

export { createPost, getPost }
