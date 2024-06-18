import { z } from "zod";
export const downloadSchema = z.object({
   title: z.string().min(1, 'Заполните поле "Заголовок"'),
   content: z.string().min(1, 'Заполните поле "Описание"'),
   name: z.string().min(1, 'Заполните поле "Название файла"'),
})

export type MainType = z.infer<typeof downloadSchema>