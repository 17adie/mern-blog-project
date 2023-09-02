// FOR FUTURE REFERENCES

import { useState } from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearch = () => {
    onSearch(searchTerm)
  }
  return (
    <div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon className="text-primary-color1 h-4 w-4" />
        </div>
        <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-primary border border-gray-300 rounded-lg bg-gray-100 focus:ring-primary-color4 focus:border-primary-color2 " placeholder="Search Title..." value={searchTerm} onChange={handleChange} />
        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-primary-color1 hover:bg-primary-color2 font-medium rounded-lg text-sm px-4 py-2" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  )
}
