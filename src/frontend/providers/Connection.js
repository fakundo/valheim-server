import React, { createContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

export const ConnectionContext = createContext()

export const ConnectionProvider = ({ children }) => {
  const [socket, setSocket] = useState()

  useEffect(() => {
    if (!socket) {
      setSocket(io({
        transports: ['websocket'],
      }))
    }
  }, [])

  return (
    <ConnectionContext.Provider value={socket}>
      { children}
    </ConnectionContext.Provider>
  )
}
