import { Link } from "react-router-dom"

export default function NoDataFound() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-primary">No data found</h1>
      <Link to="/">
        <p className="mt-2 underline">back to main page</p>
      </Link>
    </div>
  )
}
