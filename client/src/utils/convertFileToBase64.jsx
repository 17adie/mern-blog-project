const convertFileToBase64 = (file) => {
  // if the file is null return it: for update purposes
  if (!file) return file

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      resolve(reader.result)
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}

export default convertFileToBase64
