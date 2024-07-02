import { z } from "zod";
export const downloadUpdateSchema = z.object({
   title: z.string(),
   content: z.string(),
})

export type MainType = z.infer<typeof downloadUpdateSchema>