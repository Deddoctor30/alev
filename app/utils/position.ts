export const positionFnc = (position: string | null) => {
   if (position === undefined || position === null) return 'Ошибка парсинга'
   switch (position) {
      case 'director':
         return 'Директор'
      case 'preDirector':
         return 'Заместитель Директора'
      case 'gip':
         return 'ГИП'
      case 'gap':
         return 'ГАП'
   }
}