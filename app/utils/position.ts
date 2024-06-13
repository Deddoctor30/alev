export const positionFnc = (position: string) => {
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