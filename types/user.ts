import {Post} from "./post"
import Role from "./role"

type User = {
   id: number,
   createdAt: Date
   name: string
   email?: string | null
   tel?: string | null
   role: keyof typeof Role
   position: string
   posts: Post[]
   avatar: File | string
}

export default User