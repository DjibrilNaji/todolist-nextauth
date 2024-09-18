"use client"

import { Session } from "next-auth"
import React, { createContext, useContext } from "react"

interface AppContextType {
  ownerId?: string
}

export function AppContextProvider(props: { session: Session | null; children: React.ReactNode }) {
  const ownerId = props.session?.user?.id

  return (
    <AppContext.Provider
      {...props}
      value={{
        ownerId
      }}
    />
  )
}

const AppContext = createContext<AppContextType>({} as AppContextType)
const useAppContext = () => useContext(AppContext)

export default useAppContext
