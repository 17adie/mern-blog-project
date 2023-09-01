import App from "./config/express.config.js"
import dotenv from "dotenv"
import connectDB from "./mongodb/connect.js"

// load variables in .env files
dotenv.config()

// Start server
const startServer = async () => {
  try {
    const port = process.env.PORT

    connectDB(process.env.MONGODB_URL)

    App.listen(port, () => console.log(`Server is running on port ${port}`))
  } catch (error) {}
}

startServer()
