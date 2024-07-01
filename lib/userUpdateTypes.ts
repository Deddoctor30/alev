import { z } from "zod";
export const userUpdateSchema = z.object({
   name: z.string(),
   email: z.string(),
   tel: z.string(),
   position: z.string(),
})

export type MainType = z.infer<typeof userUpdateSchema>