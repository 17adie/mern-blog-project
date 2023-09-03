import { useNavigate, Link } from "react-router-dom"

export default function EditDeleteButtons({ id, handleDeletePost }) {
  const navigate = useNavigate()

  return (
    <div className="flex gap-2 justify-end">
      <Link className="px-3 py-1.5 text-sm font-semibold leading-6 text-white bg-green-500 rounded-md shadow-sm hover:bg-green-400">Edit</Link>
      <button onClick={() => handleDeletePost(id)} className="px-3 py-1.5 text-sm font-semibold leading-6 text-white bg-red-500 rounded-md shadow-sm hover:bg-red-400">
        Remove
      </button>
    </div>
  )
}
