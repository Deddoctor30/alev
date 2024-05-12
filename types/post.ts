enum Types {
   house,
   markets,
   office,
   public
}

export type PostType = Types

export type Post = {
   id: number
   createdAt: Date
   updatedAt: Date
   title: string
   content: string
   thumbnail: File
   gallery: File[]
   // может имя автора а не id?
   gip: string
   gap: string
   type: Types
}
