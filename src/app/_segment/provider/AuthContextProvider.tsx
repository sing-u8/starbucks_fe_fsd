"use client"
import { SessionContext } from "@/app/_segment/context/sessionContext"
import React from "react"

export const AuthContextProvider = ({
  isAuth,
  children,
}: {
  isAuth: boolean
  children: React.ReactNode
}) => {
  return (
    <SessionContext.Provider value={isAuth}>{children}</SessionContext.Provider>
  )
}
