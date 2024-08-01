export type Docs = {
   id: number;
   createdAt: Date;
   updatedAt: Date;
   title: string;
   content?: string | null;
   name: string;
   path: string;
   thumbnail: string[]
}
