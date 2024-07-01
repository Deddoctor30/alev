import { z } from "zod";
export const newsUpdateSchema = z.object({
   title: z.string(),
   content: z.string()
})

export type MainType = z.infer<typeof newsUpdateSchema>