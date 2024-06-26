export const dateFormatter = (date: Date) => {
   const Month1 = ["января ", "февраля ", "марта ", "апреля ", "мая ", "июня ", "июля ", 
      "августа ", "сентября ", "октября ", "ноября ", "декабря "];
   function padTo2Digits(num: number) {
      return num.toString().padStart(2, '0');
    }
    const year = date.getFullYear();
    const month = Month1.at(date.getMonth());
   //  const month = padTo2Digits(date.getMonth() + 1);
   // const month = date.toLocaleString('default', { month: 'long' });
    const day = padTo2Digits(date.getDate());
   //  const withSlashes = [day, month, year].join('/');
    return [day, month, year].join(' ');
}