import { z } from "zod";
export const newsSchema = z.object({
   title: z.string().min(1, 'Заполните поле "Название"'),
   content: z.string().min(1, 'Заполните поле "Описание"')
})

export type MainType = z.infer<typeof newsSchema>