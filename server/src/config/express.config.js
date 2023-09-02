import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

// load variables in .env files
dotenv.config()

// #Router
import AuthenticationRouter from "../routes/authRoutes.js"
import PostRouter from "../routes/postRoutes.js"

const App = express()

// Use cors
App.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_HOST,
  })
)

// Serve static files from the "uploads" folder
App.use("/uploads", express.static("uploads"))
// App.use('/uploads', express.static(__dirname + '/uploads'));

// Parse incoming request with json payload
App.use(express.json())

// Parse and handle HTTP cookies that are sent by the client's browser as a part of the HTTP request.
App.use(cookieParser())

// Get the json payload with Content-Type header
// Preventing to get undefined value in request
App.use(express.urlencoded({ extended: true }))

// #Routes

// For checking if the api is working
App.get("/", (req, res) => {
  res.status(200).send({ message: "Hello World!" })
})

// Authentication
App.use("/api/auth", AuthenticationRouter)
App.use("/api/post", PostRouter)

export default App
