import { z } from "zod";
export const adminUpdateSchema = z.object({
   email: z.string().email('Неверный E-mail'),
   password: z.string(),
})

export type MainType = z.infer<typeof adminUpdateSchema>