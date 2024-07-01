import { z } from "zod";

export const postsSchema = z.object({
   title: z.string().min(1, 'Заполните поле "Название"'),
   content: z.string(),

   landArea: z.string(),
   buildArea: z.string(),
   floorsAbove: z.string(),
   floorsBelow: z.string(),
   liveArea: z.string(),
   commerceArea: z.string(),
   apartmentsCount: z.string(),
   mopCount: z.string(),
   
   secondContent: z.string(),
   type: z.string().min(1, 'Заполните поле "Тип"'),
   isOnMain: z.preprocess(value => value === 'on', z.boolean())
})

export type MainType = z.infer<typeof postsSchema>

