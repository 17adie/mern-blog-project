import { XMarkIcon } from "@heroicons/react/24/outline"

export default function NoPost() {
  return (
    <div className="flex flex-col items-center justify-center my-20 text-primary-color2">
      <XMarkIcon className="w-auto h-10" />
      <h1>No post yet.</h1>
    </div>
  )
} 
