export const adminFormatter = (item: string) => {
   switch (item) {
      case 'id':
         return 'Id:'
      case 'createdAt':
         return 'Создано:'
      case 'updatedAt':
         return 'Обновлено:'
      case 'name':
         return 'Имя:'
      case 'email':
         return 'Почта:'
      case 'tel':
         return 'Телефон:'
      case 'position':
         return 'Должность:'
      case 'role':
         return 'Роль:'
      case 'avatar':
         return 'Аватар:'
      case 'title':
         return 'Заголовок:'
      case 'content':
         return 'Содержание:'
      case 'gip':
         return 'ГИП проекта:'
      case 'gap':
         return 'ГАП проекта:'
      case 'thumbnail':
         return 'Превью:'
      case 'gallery':
         return 'Галерея:'
      case 'type':
         return 'Тип объекта:'
      case 'authorId':
         return 'Id автора:'
      case 'address':
         return 'Адрес:'
      case 'phone':
         return 'Телефон:'
      case 'yandex':
         return 'Ссылка для Яндекс карт:'
      case 'point':
         return 'По вопросам:'
      case 'path':
         return 'Путь к файлу:'
   }
}