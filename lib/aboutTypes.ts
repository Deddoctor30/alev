import { z } from "zod";
export const aboutSchema = z.object({
   address: z.string().min(1, 'Заполните поле "Описание"'),
   email: z.string().min(1, 'Заполните поле "Описание"'),
   phone: z.string(),
   yandex: z.string()
})

export type MainType = z.infer<typeof aboutSchema>