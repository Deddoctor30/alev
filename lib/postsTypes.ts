import { z } from "zod";

export const postsSchema = z.object({
   title: z.string().min(1, 'Заполните поле "Название"'),
   content: z.string().min(1, 'Заполните поле "Описание"'),
   gip: z.string(),
   gap: z.string(),
   type: z.string().min(1, 'Заполните поле "Тип"'),
})

export type MainType = z.infer<typeof postsSchema>