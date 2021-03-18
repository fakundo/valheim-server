import { useContext, useEffect } from 'react'
import { ConnectionContext } from 'providers'

export default (event, handler) => {
  const conn = useContext(ConnectionContext)
  useEffect(() => {
    conn?.on(event, handler)
    return () => {
      conn?.off(event, handler)
    }
  }, [conn, event, handler])
}
