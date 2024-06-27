export const dateFormatter = (date: Date) => {
   const Month1 = ["января ", "февраля ", "марта ", "апреля ", "мая ", "июня ", "июля ", 
      "августа ", "сентября ", "октября ", "ноября ", "декабря "];
   function padTo2Digits(num: number) {
      return num.toString().padStart(2, '0');
    }
    const year = date.getFullYear();
    const month = Month1.at(date.getMonth());
    const day = padTo2Digits(date.getDate());
    return [day, month, year].join(' ');
}