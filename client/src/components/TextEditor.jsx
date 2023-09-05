import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

export default function TextEditor({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      ["clean"],
    ],
  }

  return (
    <ReactQuill
      className="h-80" // Adjust the heights based on your preference
      value={value}
      onChange={onChange}
      theme="snow"
      modules={modules}
    />
  )
}
