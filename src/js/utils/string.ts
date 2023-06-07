export const filterValue = (value: string, query: string) =>
  value.toLowerCase().includes(query.trim().toLowerCase())
