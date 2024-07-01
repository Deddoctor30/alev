import { z } from "zod";
export const contactsUpdateSchema = z.object({
   point: z.string(),
   email: z.string(),
   phone: z.string()
})

export type MainType = z.infer<typeof contactsUpdateSchema>