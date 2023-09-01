/* NOT USING THIS FILE: FOR FUTURE REFERENCE ONLY */

import jwt from "jsonwebtoken"

const verifyToken = (token) => {
  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET)
      return { user }
    } catch (err) {
      return { error: "Token verification failed. Please re-login your account." }
    }
  } else {
    return { error: "Token not provided. Please re-login your account." }
  }
}

export default verifyToken
