"use client"

import { Session } from "next-auth"
import React, { createContext, useContext } from "react"

interface AppContextType {
  ownerId?: string
  userImage?: string | null
  userName?: string | null
}

export function AppContextProvider(props: { session: Session | null; children: React.ReactNode }) {
  const ownerId = props.session?.user?.id
  const userImage = props.session?.user?.image
  const userName = props.session?.user?.name

  return (
    <AppContext.Provider
      {...props}
      value={{
        ownerId,
        userImage,
        userName
      }}
    />
  )
}

const AppContext = createContext<AppContextType>({} as AppContextType)
const useAppContext = () => useContext(AppContext)

export default useAppContext
