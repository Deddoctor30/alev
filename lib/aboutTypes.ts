import { z } from "zod";
export const aboutSchema = z.object({
   address: z.string(),
   email: z.string(),
   phone: z.string(),
   yandex: z.string()
})

export type MainType = z.infer<typeof aboutSchema>