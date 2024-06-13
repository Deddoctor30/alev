import { z } from "zod";
export const contactsSchema = z.object({
   point: z.string().min(1, 'Заполните поле "Описание"'),
   email: z.string().min(1, 'Заполните поле "Описание"'),
   phone: z.string()
})

export type MainType = z.infer<typeof contactsSchema>