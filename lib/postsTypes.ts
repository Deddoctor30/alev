import { z } from "zod";

export const postsSchema = z.object({
   title: z.string().min(1, 'Заполните поле "Наименование"'),
   content: z.string(),
   gip: z.string(),
   gap: z.string(),
   type: z.string(),
})

export type MainType = z.infer<typeof postsSchema>