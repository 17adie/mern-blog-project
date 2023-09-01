import { useState } from "react"

export default function LongText({ text, maxLength }) {
  if (maxLength >= text.length) {
    // If maxLength is greater than or equal to the text length, display the entire text
    return <p className="text-gray-600 text-sm">{text}</p>
  }

  const [showFullText, setShowFullText] = useState(false)
  // Truncate the text if it's longer than the specified maxLength
  const truncatedText = showFullText ? text : text.slice(0, maxLength)

  return (
    <div>
      <p className="text-gray-600 text-sm">{truncatedText}</p>
      {text.length > maxLength && (
        <button className="text-xs text-gray-500  hover:underline" onClick={() => setShowFullText(!showFullText)}>
          {showFullText ? "See Less" : "See More"}
        </button>
      )}
    </div>
  )
}
