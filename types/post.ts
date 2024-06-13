enum Types {
   house,
   office,
   market,
   public
}
export type PostType = Types
export type Post = {
   id: number
   createdAt: Date
   updatedAt: Date
   title: string
   content: string
   thumbnail?: File | string
   gallery: File[] | string[]
   gip?: string
   gap?: string
   type?: Types
   authorId?: number
}
