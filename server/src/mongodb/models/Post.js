import mongoose from "mongoose"
const { Schema, model } = mongoose

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // date_created: {
    //   type: Date,
    //   required: true,
    //   default: () => Date.now(), // Use a function to set the default value. To get the exact time
    // },
    // date_updated: {
    //   type: Date,
    //   required: true,
    //   default: () => Date.now(), // Use a function to set the default value. To get the exact time
    // },
  },
  { timestamps: true } // same as on the top buy automatically update
)

const PostModel = model("Post", PostSchema)

export default PostModel
