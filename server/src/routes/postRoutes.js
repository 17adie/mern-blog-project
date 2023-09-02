import express from "express"
import uploadMiddleware from "../middleware/upload.middleware.js"
import authMiddleware from "../middleware/auth.middleware.js"
import { createPost, getUserPost, getAllPosts, getPost } from "../controllers/post/post.controller.js"

const PostRouter = express.Router()

// Middleware to attach req.file to req.locals
const attachFileToLocals = (req, res, next) => {
  req.locals = { ...req.locals, file: req.file }
  next()
}

// #Routes definition

// Get all post
PostRouter.get("/posts", getAllPosts)

// Get posts by a specific user
PostRouter.get("/user-posts", authMiddleware, getUserPost)

// Create a new post
PostRouter.post("/posts", authMiddleware, uploadMiddleware.single("file"), attachFileToLocals, createPost)

// Get a post by ID
PostRouter.get("/:id", authMiddleware, getPost)

export default PostRouter
