import bcrypt from "bcrypt"

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password, salt)
    return hash
  } catch (err) {
    throw err
  }
}

const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed)
}

export { hashPassword, comparePassword }
