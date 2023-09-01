import CryptoJS from "crypto-js"

const useCrypto = () => {
  const encrypt = (value) => {
    return CryptoJS.AES.encrypt(value, import.meta.env.VITE_CRYPTO_KEY).toString()
  }

  const decrypt = (value) => {
    const bytes = CryptoJS.AES.decrypt(value, import.meta.env.VITE_CRYPTO_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
  }

  return { encrypt, decrypt }
}

export default useCrypto
