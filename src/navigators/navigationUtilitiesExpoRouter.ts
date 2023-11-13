import { useEffect, useRef } from "react"
import { usePathname, useGlobalSearchParams } from "expo-router"
import * as storage from "@/utils/storage"

type Storage = typeof storage

export function useNavigationPersistence(storage: Storage, persistenceKey: string) {
  const pathname = usePathname()
  const searchParams = useGlobalSearchParams()

  // This ref will keep track of the previous route name
  const previousRouteNameRef = useRef<string | null>(null)

  useEffect(() => {
    // Construct the full path with search parameters
    const fullPath = pathname + (searchParams ? `?${searchParams}` : "")
    const previousRouteName = previousRouteNameRef.current

    if (previousRouteName !== fullPath) {
      // track screens.
      if (__DEV__) {
        console.tron.log?.(`Navigating to: ${fullPath}`)
      }

      // Save the current route name for later comparison
      previousRouteNameRef.current = fullPath

      // Persist state to storage
      storage.save(persistenceKey, fullPath)
    }
  }, [pathname, searchParams])
}
