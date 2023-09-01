import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import useCrypto from "../hooks/crypto.hooks"

const { encrypt } = useCrypto()

/*
 If you need to persist state data across page refreshes, 
 you can use middleware like zustand/middleware/persist. 
 This middleware allows you to store the Zustand state in 
 a persistent storage such as localStorage or sessionStorage, 
 so that the state data remains available even after a page refresh.
*/
const useAccountStore = create(
  persist(
    (set) => ({
      account: "",
      storeAccount: (data) => {
        if (data === undefined) set({ account: "" })
        else {
          const encryptedData = encrypt(JSON.stringify(data))
          set({ account: encryptedData })
        }
      },
    }),
    { name: "acc", storage: createJSONStorage(() => localStorage) }
  )
)

export default useAccountStore
