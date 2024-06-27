export const titleCutter = (value: string, length: number) => {
   return value.length > length ? `${value.slice(0, 220)}...` : value
}