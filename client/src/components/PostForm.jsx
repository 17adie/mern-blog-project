import { PhotoIcon } from "@heroicons/react/24/outline"
import TextEditor from "../components/TextEditor"
import { toast } from "react-hot-toast"

export default function PostForm({ onSubmit, formRef, formData, handleInputChange, setFormData, type }) {
  // #File input region
  const setSelectedFile = (file) => {
    setFormData((prevData) => ({
      ...prevData,
      file: file,
    }))
  }

  // Validate the file
  const validateAndSetFile = (file) => {
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"]

      if (!allowedTypes.includes(file.type)) {
        toast.error("Only PNG, JPEG, and GIF files are allowed.")
        setSelectedFile(null)
      } else if (file.size > 10 * 1024 * 1024) {
        toast.error("File size exceeds the limit of 10MB.")
        setSelectedFile(null)
      } else {
        setSelectedFile(file)
      }
    }
  }

  // Handle change in file input
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    validateAndSetFile(file)
  }

  // Prevents the default behavior of dragging. To be able to drop the file.
  const handleDragOver = (e) => {
    e.preventDefault()
  }

  // Responsible for handling the dropped file.
  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    validateAndSetFile(file)
  }

  // Clear input file.
  const handleClearFile = () => {
    setSelectedFile(null)
  }
  // #File input end

  // Handle changes in text editor
  const handleEditorChange = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      content: content,
    }))
  }

  return (
    <form onSubmit={onSubmit} ref={formRef}>
      <div className="space-y-12">
        <div>
          {/* Layout 1 */}
          {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-primary">
                Title <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input type="text" name="title" id="title" autoComplete="title" value={formData.title} onChange={handleInputChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-color4 sm:text-sm sm:leading-6" placeholder="Enter Title" required />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="summary" className="block text-sm font-medium leading-6 text-primary">
                Summary <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <textarea id="summary" name="summary" rows={3} value={formData.summary} onChange={handleInputChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-color4 sm:text-sm sm:leading-6" placeholder="Enter Summary" required />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="file" className="block text-sm font-medium leading-6 text-primary">
                Cover photo <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10" onDragOver={handleDragOver} onDrop={handleDrop}>
                <div className="text-center">
                  {formData.file ? (
                    <div>
                      <img src={URL.createObjectURL(formData.file)} alt="Selected" className="mx-auto h-20 w-20" />
                      <button className="mt-2 text-xs text-red-600 hover:underline" onClick={handleClearFile}>
                        Clear
                      </button>
                    </div>
                  ) : (
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  )}
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label htmlFor="file" className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-color1 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-color4 focus-within:ring-offset-2 hover:text-primary-color2">
                      <span>Upload a file</span>
                      <input id="file" name="file" type="file" className="sr-only" onChange={handleFileChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="content" className="block text-sm font-medium leading-6 text-primary">
                Content <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <TextEditor value={formData.content} onChange={handleEditorChange} />
              </div>
            </div>
          </div> */}

          {/* Layout 2 */}
          <div className="flex flex-col md:flex-row mb-4 gap-5 mt-10">
            <div className="w-full md:w-1/2 md:h-auto mb-2 md:mb-0 grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Title section */}
              <div className="sm:col-span-full">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-primary">
                  Title <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input type="text" name="title" id="title" autoComplete="title" value={formData.title} onChange={handleInputChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-color4 sm:text-sm sm:leading-6" placeholder="Enter Title" />
                </div>
              </div>

              {/* Summary section */}
              <div className="col-span-full">
                <label htmlFor="summary" className="block text-sm font-medium leading-6 text-primary">
                  Summary <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <textarea id="summary" name="summary" rows={3} value={formData.summary} onChange={handleInputChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-color4 sm:text-sm sm:leading-6" placeholder="Enter Summary" />
                </div>
              </div>

              {/* Cover photo section */}
              <div className="col-span-full">
                <label htmlFor="file" className="block text-sm font-medium leading-6 text-primary">
                  Cover photo {type == "Update" ? <div className="text-xs text-gray-600 font-light">Note: Please choose a file to update the cover. If you don't want to update it, just leave it blank.</div> : <span className="text-red-500s">*</span>}
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-3" onDragOver={handleDragOver} onDrop={handleDrop}>
                  <div className="text-center">
                    {formData.file ? (
                      <div>
                        <img src={URL.createObjectURL(formData.file)} alt="Selected" className="mx-auto h-20 w-20" />
                        <button className="mt-2 text-xs text-red-600 hover:underline" onClick={handleClearFile}>
                          Clear
                        </button>
                      </div>
                    ) : (
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label htmlFor="file" className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-color1 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-color4 focus-within:ring-offset-2 hover:text-primary-color2">
                        <span>Upload a file</span>
                        <input id="file" name="file" type="file" className="sr-only" onChange={handleFileChange} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content section */}
            <div className="w-full md:w-1/2 md:h-auto">
              <div className="col-span-full">
                <label htmlFor="content" className="block text-sm font-medium leading-6 text-primary">
                  Content <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <TextEditor value={formData.content} onChange={handleEditorChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
