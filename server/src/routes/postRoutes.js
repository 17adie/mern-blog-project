import express from "express"
import uploadMiddleware from "../middleware/upload.middleware.js"
import authMiddleware from "../middleware/auth.middleware.js"
import { createPost, getUserPost, getAllPosts, getPost, deletePost, updatePost } from "../controllers/post/post.controller.js"

const PostRouter = express.Router()

// Middleware to attach req.file to req.locals. To be able to get the filename (ref. create post and update post)
// const attachFileToLocals = (req, res, next) => {
//   req.locals = { ...req.locals, file: req.file }
//   next()
// }

// #Routes definition

// Get all post
PostRouter.get("/posts", getAllPosts)

// Get all posts by a specific user
PostRouter.get("/user-posts", authMiddleware, getUserPost)

// Create a new post
// PostRouter.post("/posts", authMiddleware, uploadMiddleware.single("file"), attachFileToLocals, createPost) // for local folder saving image
PostRouter.post("/posts", authMiddleware, createPost) // for cloudinary

// Get a post by ID
PostRouter.get("/:id", getPost)

// update post
// PostRouter.put("/posts/:id", authMiddleware, uploadMiddleware.single("file"), attachFileToLocals, updatePost) // for local folder saving image
PostRouter.put("/posts/:id", authMiddleware, updatePost)

// delete post
PostRouter.delete("/:id", authMiddleware, deletePost)

export default PostRouter
