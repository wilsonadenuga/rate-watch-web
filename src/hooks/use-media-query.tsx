import * as React from 'react'

export function useMediaQuery(query: string) {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const result = matchMedia(query)
      result.addEventListener('change', onChange)
      return () => result.removeEventListener('change', onChange)
    },
    [query],
  )

  return React.useSyncExternalStore(
    subscribe,
    () => matchMedia(query).matches,
    () => false,
  )
}
