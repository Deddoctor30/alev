import Post from "./post"
import Role from "./role"

type User = {
   id: number,
   createdAt: Date
   email: string
   name?: string | null
   role: keyof typeof Role
   posts: Post[]
}

export default User