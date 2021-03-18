export const createFileURL = (binary) => {
  const blob = new window.Blob([binary], { type: 'octet/stream' })
  return window.URL.createObjectURL(blob)
}
