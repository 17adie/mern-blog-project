// # This method is replaced with Cloudinary. Saved for future reference.

/**
 * Multer is a node.js middleware for handling multipart/form-data , which is primarily used for uploading files.
 * It is written on top of busboy for maximum efficiency. NOTE: Multer will not process any form which is not
 * multipart ( multipart/form-data ).
 * Note: It also works for PUT request using axios.
 */

import multer from "multer"
import fs from "fs"

// A function to get the upload directory path
const getUploadDirectory = () => {
  const uploadDirectory = "uploads/"

  // Check if the upload directory exists, and create it if not
  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true }) // Create the directory recursively
  }

  return uploadDirectory
}

// Configure multer's storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination directory for uploaded files
    // This is where files will be saved on the server
    cb(null, getUploadDirectory())
  },
  filename: (req, file, cb) => {
    // Generate a unique filename based on the current timestamp and original filename
    const uniqueFileName = Date.now() + "-" + file.originalname

    // Attach the generated filename to req.locals for use in the route handler
    // req.locals can be used to pass data between middleware and route handlers
    req.locals = { ...req.locals, fileName: uniqueFileName }

    // Call the callback with the generated filename to save the file with that name
    cb(null, uniqueFileName)
  },
})

// Create the multer middleware with the configured storage
const uploadMiddleware = multer({ storage: storage })

export default uploadMiddleware
