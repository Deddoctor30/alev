import { Tep } from "./tep"

enum Type {
   HOdUSE,
   OFFICE,
   MARKET,
   PUBLIC
}
export type PostType = Type
export type Post = {
   id: number
   createdAt: Date
   updatedAt: Date
   title: string
   content?: string | null
   tep: Tep[]
   secondContent?: string | null
   thumbnail: string[]
   gallery: string[]
   type: Type
   authorId?: number
   isOnMain: boolean
}
