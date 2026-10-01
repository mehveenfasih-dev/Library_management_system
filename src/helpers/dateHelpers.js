export const toISOString = (date = new Date()) => new Date(date).toISOString()

export const toISOStringAfterDays = (days, fromDate = new Date()) => {
  const date = new Date(fromDate)
  date.setDate(date.getDate() + days)
  return toISOString(date)
}