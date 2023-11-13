// AuthProvider.tsx
import React, { createContext, useContext, useEffect } from "react"
import { useRouter } from "expo-router"
import { useStores } from "@/models"
import { autorun } from "mobx" // Import autorun from mobx

const AuthContext = createContext({
  isAuthenticated: false,
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const { authenticationStore } = useStores()
  const router = useRouter()

  useEffect(() => {
    // Use autorun to react to changes in the authentication state
    const disposer = autorun(() => {
      // This will run every time the isAuthenticated property changes
      if (authenticationStore.isAuthenticated) {
        router.replace("/welcome")
      } else {
        router.replace("/login")
      }
    })

    // Return a cleanup function that MobX will call when
    // this observed function is no longer needed
    return disposer
  }, [authenticationStore, router])

  // There's no need to pass isAuthenticated down through context
  // if it's already available in the authenticationStore, but you can
  // if you need to pass down actions or other non-observable data.
  return (
    <AuthContext.Provider value={{ isAuthenticated: authenticationStore.isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
