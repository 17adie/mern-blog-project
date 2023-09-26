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
  try {
    const { page, limit } = req.query
    const skip = (page - 1) * limit
    const id = req.id

    const userPost = await Post.find({ author: id }).populate("author", { first_name: 1, last_name: 1, _id: 0 }).sort({ date_created: -1 }).skip(skip).limit(parseInt(limit)) // Exclude _id, include first_name and last_name

    return res.json({
      status: true,
      data: userPost,
      postOwner: true,
    })
  } catch (error) {
    console.log({ error })
    return res.json({ status: false, route: "get user post", error: error })
  }
}

// Get all post
const getAllPosts = async (req, res) => {
  try {
    const { page, limit } = req.query
    const skip = (page - 1) * limit

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

// Update a post
const updatePost = async (req, res) => {
  try {
    const { title, summary, content } = req.body
    const { id } = req.params // post id
    const { fileName } = req.locals // get saved filename from /upload
    const userID = req.id // get user id for updating condition

    const postDoc = await Post.findById(id) // get the author id

    // userID from decrypted token and postDoc.author.toString() is from find
    // return false if not equal
    if (userID !== postDoc.author.toString()) {
      return res.json({ status: false, message: "You're not authorize to modify this post." })
    }

    // Get the current time
    const currentTime = new Date()

    /**
     * Construct the update object using the $set operator
     * Note: When you use $set in an update operation, you are telling MongoDB to update
     * only the specified fields while leaving all other fields in the document unchanged.
     * It's a way to perform a partial update without affecting the entire document.
     *
     * When you don't use $set in an update operation, MongoDB will replace the entire
     * document with the new data provided. This means that any fields not included in
     * the update object will be removed from the document.
     *
     * But this works only using MongoDB driver. Using mongoose you using it or not is okay.
     * check documentation : https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
     * gpt explanation: https://chat.openai.com/c/d5dd46a6-057f-469e-b9a3-20da531c4cb8
     */
    const updateObject = {
      // $set: {
      title: title,
      summary: summary,
      content: content,
      date_updated: currentTime,
      // },
    }

    // Check if fileName is provided and not null
    if (fileName !== undefined) {
      // If fileName is provided, update the file field
      // updateObject.$set.cover_path = fileName // using set
      updateObject.cover_path = fileName
    }

    // Use findByIdAndUpdate to update the document
    const updatedDocument = await Post.findByIdAndUpdate(
      id,
      updateObject,
      { new: true } // Return the updated document
    )

    if (!updatedDocument) {
      return res.json({ status: false, message: "Failed update. Document not found" })
    }

    return res.json({ status: true, data: updatedDocument, message: "Post updated successfully!" })
  } catch (error) {
    console.log(error)
  }
}

export { createPost, getUserPost, getAllPosts, getPost, deletePost, updatePost }
