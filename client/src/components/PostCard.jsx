import { Link } from "react-router-dom"
import { format } from "date-fns"
import LongText from "./LongText"
import EditDeleteButtons from "./EditDeleteButtons"

export default function PostCard({ _id, title, cover_path, date_created, author, summary, handleDeletePost, postOwner }) {
  const coverPath = import.meta.env.VITE_COVER_PATH + cover_path

  const formattedDateCreated = format(new Date(date_created), "MMMM d, yyyy h:mm a")

  return (
    <div className="lg:flex bg-white shadow-sm rounded-lg overflow-hidden my-10 justify-between">
      <div className="lg:w-1/3">
        <Link to={`/post/${_id}`}>
          <img className="object-cover h-48 w-96 rounded p-3 hover:scale-110 ease-in duration-200" src={coverPath} alt="cover photo" />
        </Link>
      </div>
      <div className="flex flex-col p-4 lg:w-2/3 justify-between">
        <div>
          <Link to={`/post/${_id}`} className="text-2xl font-semibold text-primary hover:underline">
            {title}
          </Link>
          <div className="mb-4 flex flex-col items-baseline gap-1 sm:flex-row">
            <span className="mr-2">{author.first_name + " " + author.last_name}</span>
            <span className="text-gray-500 text-xs"> {formattedDateCreated}</span>
          </div>
          <LongText text={summary} maxLength={100} />
        </div>
        {postOwner && <EditDeleteButtons id={_id} handleDeletePost={handleDeletePost} />}
      </div>
    </div>
  )
}
