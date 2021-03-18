import { useMemo } from 'react'
import { getSessionStorageItem, setSessionStorageItem } from 'utils'

export default (key) => (
  useMemo(() => ({
    get: () => getSessionStorageItem(key),
    set: (data) => setSessionStorageItem(key, data),
  }), [key])
)
