import { z } from "zod";
export const downloadSchema = z.object({
   title: z.string().min(1, 'Заполните поле "Заголовок"'),
   content: z.string(),
})

export type MainType = z.infer<typeof downloadSchema>