import { z } from "zod";
export const userSchema = z.object({
   name: z.string().min(1, 'Заполните поле "Имя сотрудника"'),
   email: z.string(),
   tel: z.string(),
   position: z.string(),
   // avatar: z.array(z.string())
})

export type MainType = z.infer<typeof userSchema>