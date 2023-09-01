import mongoose from "mongoose"
const { Schema, model } = mongoose

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  date_updated: {
    type: Date,
    required: true,
    default: Date.now(),
  },
})

const UserModel = model("User", UserSchema)

export default UserModel
