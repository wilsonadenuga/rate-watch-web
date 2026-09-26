'use client'

import { Suspense } from 'react'
import { AppProvider } from './app.provider'
import { ReactQueryProvider } from './react-query.provider'

export function Providers(
  props: Readonly<{ children: React.ReactNode; defaultSourceCurrency: string }>,
) {
  return (
    <Suspense>
      <AppProvider defaultSourceCurrency={props.defaultSourceCurrency}>
        <ReactQueryProvider>{props.children}</ReactQueryProvider>
      </AppProvider>
    </Suspense>
  )
}
