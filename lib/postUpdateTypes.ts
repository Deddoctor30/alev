import { z } from "zod";
export const postsUpdateSchema = z.object({
   title: z.string(),
   content: z.string(),
   secondContent: z.string(),
   type: z.string().min(1, 'Заполните поле "Тип"'),
   isOnMain: z.preprocess(value => value === 'on', z.boolean())
})

export type MainType = z.infer<typeof postsUpdateSchema>