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
   content?: string
   tep?: object[]
   secondContent?: string
   thumbnail?: File | string[]
   gallery: File[] | string[]
   type: Types
   authorId?: number
   isOnMain: boolean
}
