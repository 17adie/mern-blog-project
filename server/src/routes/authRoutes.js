import express from "express"
import { registerUser, loginUser } from "../controllers/authentication/auth.controller.js"

const AuthenticationRouter = express.Router()

AuthenticationRouter.post("/register", registerUser)
AuthenticationRouter.post("/login", loginUser)

export default AuthenticationRouter
