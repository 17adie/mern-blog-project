import jwt from "jsonwebtoken"

// Function for validating user token
const AuthMiddleware = async (req, res, next) => {
  try {
    const secretKey = process.env.JWT_SECRET
    const { token } = req.cookies

    if (!token) throw new Error()

    // Decode token
    const decoded = jwt.verify(token, secretKey)

    // ## You can add request to database for user id validations for more security
    /* add code here */

    // Make request as CustomRequest
    // Add decoded token to string property in CustomRequest
    req.id = decoded.id
    // Run the next function
    next()
  } catch (err) {
    res.status(401).json({ status: false, data: null, error: err }) 
  }
}

export default AuthMiddleware
