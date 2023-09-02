import User from "../../mongodb/models/User.js"
import { hashPassword, comparePassword } from "../../helpers/auth.js"
import isEmailValid from "../../helpers/emailValidations.js"
import jwt from "jsonwebtoken"

const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body

    // validations
    // required fields
    // if (!first_name.trim() || !last_name.trim() || !email.trim() || !password.trim()) {
    //   return res.json({
    //     status: false,
    //     message: "Please fill out all required fields.",
    //   })
    // }

    // simplified version of the above code
    // Check for required fields
    const requiredFields = [first_name, last_name, email, password]
    if (requiredFields.some((field) => !field.trim())) {
      return res.json({
        status: false,
        message: "Please fill out all required fields.",
      })
    }

    // email validation
    if (!isEmailValid(email)) {
      return res.json({
        status: false,
        message: "Invalid email address.",
      })
    }

    // check if password is good
    if (password.trim().length < 6) {
      return res.json({
        status: false,
        message: "Invalid password. Password is required and should be at least 6 characters long.",
      })
    }

    // check email if exist
    const exist = await User.findOne({ email })

    if (exist) {
      return res.json({
        status: false,
        message: "Email is taken already.",
      })
    }

    // hash password
    const hashedPassword = await hashPassword(password)

    // create new user
    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    })

    // return response
    return res.status(200).json({
      status: true,
      message: "Your account has been created successfully!",
      data: user,
    })
  } catch (error) {
    console.log({ error })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.json({
        status: false,
        message: "No user found.",
      })
    }

    const passwordMatch = await comparePassword(password, user.password)

    if (passwordMatch) {
      jwt.sign(
        { email: user.email, id: user._id, first_name: user.first_name, last_name: user.last_name },
        process.env.JWT_SECRET,
        // { expiresIn: "1h" }, // Set an expiration time
        (err, token) => {
          if (err) {
            console.error("JWT signing error:", err)
            return res.status(500).json({ error: "Internal server error" })
          }
          // Set the token as an HttpOnly and Secure cookie.
          res
            // set cookies to client side to manipulate cookies in a more user-friendly way
            .cookie("token", token, {
              // httpOnly: true, // Prevent JavaScript access. set to true to not be able to access or get the cookie values
              secure: true, // Only send over HTTPS
              sameSite: "none", // Protect against CSRF attacks. Note: don't use "strict" if you using cross-site meaning different website. server website != client website
            })
            .json({ status: true, message: "Login success!", user: user })
        }
      )
    } else {
      res.json({
        status: false,
        message: "Incorrect password",
      })
    }
  } catch (error) {
    console.log({ error })
  }
}

export { registerUser, loginUser }
