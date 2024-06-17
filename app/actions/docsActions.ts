"use server"
import { join } from "path";
import fs from 'fs';

export  const getDocument  = async () => {
   try {
      const filePath = join(process.cwd(), 'public/files', 'resp.pdf');
      const fileStream = fs.createReadStream(filePath);
      
   } catch (e) {
      console.error('Ошибка скачивания файла', e);
   } 
}
