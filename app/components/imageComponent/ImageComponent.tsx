'use client'
import Image from "next/image";
import { useState } from "react";


const ImageComponent = ({ src, w, h, alt }: { src: string, w: number, h: number, alt: string }) => {
      const [err, setErr] = useState(false)
      console.log(err);
      
   return (
      <>
         {!err 
            ? 
               <Image
                  src={`/imdages${src}`}
                  width={w}
                  height={h}
                  alt={alt}
                  onError={() => setErr(flag => !flag)}
               />
            :
               <img src={src} alt={alt} />
      }
      </>

   )
}

export default ImageComponent