import { z } from "zod";

export const postsSchema = z.object({
   title: z.string().min(1, 'Заполните поле "Название"'),
   content: z.string(),
   gip: z.string(),
   gap: z.string(),
   type: z.string().min(1, 'Заполните поле "Тип"'),
   isOnMain: z.preprocess(value => value === 'on', z.boolean())
})

export type MainType = z.infer<typeof postsSchema>