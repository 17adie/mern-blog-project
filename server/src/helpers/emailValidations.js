const isEmailValid = (email) => {
  const regex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

  if (!email) return false

  if (email.length > 256) return false

  const valid = regex.test(email)
  if (!valid) return false

  const parts = email.split("@")
  if (parts[0].length > 64) return false

  const domainParts = parts[1].split(".")
  if (
    domainParts.some(function (part) {
      return part.length > 64
    })
  )
    return false

  return true
}

export default isEmailValid
