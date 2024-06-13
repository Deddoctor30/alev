import { z } from "zod";
export const mainSchema = z.object({
   title: z.string(),
   content: z.string().min(1, 'Заполните поле "Описание"')
})

export type MainType = z.infer<typeof mainSchema>