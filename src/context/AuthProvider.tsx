import { createContext, useContext, useEffect, useState } from "react"
import { useSegments, useRouter } from "expo-router"

type User = {
  name: string
}

type AuthType = {
  user: User | null
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthType>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {}, // No-op function as a placeholder
})

export const useAuth = () => useContext(AuthContext)

function useProtectedRoute(user: User | null) {
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)"

    if (!user && !inAuthGroup) {
      router.replace("/demoLogin")
    } else if (user && inAuthGroup) {
      router.replace("/welcome")
    }
  }, [user, segments, router])
}

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null>(null)

  useProtectedRoute(user)

  const authContext: AuthType = {
    user,
    setUser,
  }

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
}
