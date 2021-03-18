export const setSessionStorageItem = (key, value) => {
  try {
    const data = JSON.stringify(value)
    window.sessionStorage.setItem(key, data)
  } catch {
    // do nothing
  }
}

export const getSessionStorageItem = (key) => {
  try {
    const data = window.sessionStorage.getItem(key)
    return JSON.parse(data)
  } catch {
    return undefined
  }
}
