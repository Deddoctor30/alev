import { z } from "zod";
export const mainSchema = z.object({
   title: z.string(),
   content: z.string()
})

export type MainType = z.infer<typeof mainSchema>