export function toDateFormat(time: number) {
  if (!time) return ''
  return new Date(time).toLocaleString()
}
