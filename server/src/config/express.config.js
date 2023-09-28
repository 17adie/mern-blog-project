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

// Use cors local env
// App.use(
//   cors({
//     credentials: true,
//     origin: process.env.CLIENT_HOST,
//   })
// )

// Allow requests from specific origins
const allowedOrigins = [
  process.env.CLIENT_HOST,
  process.env.LIVE_CLIENT_HOST,
  // Add other origins as needed
]

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  origin: true,
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}

// Enable CORS for all routes or specify it for a specific route
App.use(cors(corsOptions))

// Serve static files from the "uploads" folder
App.use("/uploads", express.static("uploads"))
// App.use('/uploads', express.static(__dirname + '/uploads'));

// Parse incoming request with json payload
App.use(express.json({ limit: "100mb" }))

// Parse and handle HTTP cookies that are sent by the client's browser as a part of the HTTP request.
App.use(cookieParser())

// Get the json payload with Content-Type header
// Preventing to get undefined value in request
App.use(express.urlencoded({ limit: "100mb", extended: true }))

// #Routes

// For checking if the api is working
App.get("/", (req, res) => {
  res.status(200).send({ message: "Hello World!" })
})

// Authentication
App.use("/api/auth", AuthenticationRouter)
App.use("/api/post", PostRouter)

export default App
