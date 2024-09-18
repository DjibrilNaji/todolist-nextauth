"use client"

import { Session } from "next-auth"
import React, { createContext, useContext } from "react"

interface AppContextType {
  userId?: string
  userImage?: string | null | undefined
  userName?: string | null | undefined
}

export function AppContextProvider(props: { session: Session | null; children: React.ReactNode }) {
  const userId = props.session?.user?.id
  const userImage = props.session?.user?.image
  const userName = props.session?.user?.name

  return (
    <AppContext.Provider
      {...props}
      value={{
        userId,
        userImage,
        userName
      }}
    />
  )
}

const AppContext = createContext<AppContextType>({} as AppContextType)
const useAppContext = () => useContext(AppContext)

export default useAppContext
