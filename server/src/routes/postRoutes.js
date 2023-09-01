import express from "express"
import { createPost, getPost } from "../controllers/post/post.controller.js"
import uploadMiddleware from "../middleware/upload.middleware.js"
import authMiddleware from "../middleware/auth.middleware.js"

const PostRouter = express.Router()

// Middleware to attach req.file to req.locals
const attachFileToLocals = (req, res, next) => {
  req.locals = { ...req.locals, file: req.file }
  next()
}

// Route definition
PostRouter.get("/user-post", authMiddleware, getPost)
PostRouter.post("/create-post", authMiddleware, uploadMiddleware.single("file"), attachFileToLocals, createPost)

export default PostRouter
