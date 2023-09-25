"use client";

import React from 'react'
import { SessionProvider } from 'next-auth/react'
const Provider = ({children, sesssion}) => {
  return (
    <SessionProvider session={sesssion}>
        {children}
    </SessionProvider>
  )
}

export default Provider