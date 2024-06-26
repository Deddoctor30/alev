export const phoneNumberReplacer = (phone: string | null | undefined) => {
   if (phone ===  null || phone ===  undefined) return 'Нет номера'
   if (phone.startsWith('+')) {
      const a = phone.slice(0, 2)
      const b = phone.slice(2, 5)
      const c = phone.slice(5, 8)
      const d = phone.slice(8, 10)
      const e = phone.slice(10, 12)
      return a + ' ' + '(' + b + ")" + ' ' + c + '-' + d + '-' + e
   } else {
      const a = phone.slice(0, 1)
      const b = phone.slice(1, 4)
      const c = phone.slice(4, 7)
      const d = phone.slice(7, 9)
      const e = phone.slice(9, 11)
      return a + ' ' + '(' + b + ")" + ' ' + c + '-' + d + '-' + e
   }
}