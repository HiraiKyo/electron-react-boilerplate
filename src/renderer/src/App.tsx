import React from 'react'
import { SWRConfig } from 'swr'

export const App: React.FC = () => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        revalidateOnFocus: false
      }}
    >
      <div>CS2 Replayer</div>
    </SWRConfig>
  )
}
