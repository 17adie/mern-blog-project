import { Link } from "react-router-dom"
import { format } from "date-fns"
import LongText from "./LongText"

export default function PostCard({  title, cover_path, date_created, summary }) {
  const coverPath = import.meta.env.VITE_COVER_PATH + cover_path

  const formattedDateCreated = format(new Date(date_created), "MMMM d, yyyy h:mm a")

  return (
    <div className="lg:flex bg-white shadow-sm rounded-lg overflow-hidden my-10 justify-between">
      <div className="lg:w-1/3">
        <img className="object-cover h-48 w-96 rounded p-3 hover:scale-110 ease-in duration-200" src={coverPath} alt="cover photo" />
      </div>
      <div className="p-4 lg:w-2/3 justify-between">
        <Link to="#" className="text-xl font-semibold text-primary hover:underline">
          {title}
        </Link>
        <p className="text-xs text-gray-500 mb-5">{formattedDateCreated}</p>
        <LongText text={summary} maxLength={100} />
      </div>
    </div>
  )
}
