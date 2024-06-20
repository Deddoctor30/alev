import { join } from "path";
import fs from 'fs';
import { getUnique } from "@/app/actions/downloadActions";
import { NextRequest } from "next/server";

type Params = {
    id: string
}

export async function GET(request: NextRequest, content: { params: Params }) {
   const id = content.params.id
   const data  = await getUnique(Number(id))
   const fileName = data?.name ? data.name : ''
   const filePath = join(process.cwd(), 'public/files', fileName)
   const buffer = fs.readFileSync(filePath)

    // Находим расширение файла
   const fileExtension = fileName.split(".").pop()?.toLowerCase();
   
   // Список расширений файла
   const contentTypeMap = {
       svg: "image/svg+xml",
       ico: "image/x-icon",
       png: "image/png",
       jpg: "image/jpeg",
       pdf: "application/pdf",
   };

   // Определяем content type
   const contentType = contentTypeMap[fileExtension] || "application/octet-stream";

   return new Response(buffer, { status: 200, headers: new Headers({
    'content-disposition': `attachment; filename=${fileName}`,
    'Content-Type': `${contentType}`,
   })})

}