import { downloadFiles } from "@/types/downloadFiles";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";



export const download = async (path: string, setDownloadStatus: Dispatch<SetStateAction<downloadFiles>>) => {
   try {
       const response = await axios.get(path, {
           responseType: "blob", // Для бинарных данных
       });
       // Извлекаем имя фала из хедоров
       const contentDisposition = response.headers["content-disposition"];
       const fileName = contentDisposition.slice(contentDisposition.lastIndexOf('=') + 1).toLowerCase();
       // Создаем временный anchor элемент для тригера загрузки
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement("a");
       link.href = url;
       link.setAttribute("download", fileName);
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);

       // Отслеживание загрузки
       setDownloadStatus({ status: 'success', message: 'Файл загружен' });
   } catch (error) {
       console.error("Ошибка загрузки файла:", error);
       setDownloadStatus({ status: 'error', message: 'Ошибка загрузки файла' });
   }
};