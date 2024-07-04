import { z } from "zod";
export const adminSchema = z.object({
   email: z.string().email('Неверный E-mail'),
   password: z.string().min(1, 'Заполните поле "Описание"'),
})

export type MainType = z.infer<typeof adminSchema>