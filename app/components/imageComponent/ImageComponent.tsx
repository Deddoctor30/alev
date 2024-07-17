'use client'
import Image from "next/image";
import { useState } from "react";

const ImageComponent = ({ src, width, height, alt, className, priority }: { src: string, width: number, height: number, alt: string, className?: string, priority?: boolean }) => {
      const [err, setErr] = useState(false)
      console.log(err);
      
   return (
      <>
         {!err 
            ? 
               <Image
                  priority={priority}
                  className={className}
                  src={`/images${src}`}
                  width={width}
                  height={height}
                  alt={alt}
                  onError={() => setErr(flag => !flag)}
               />
            :
               <img className={className} src={src} alt={alt}/>
      }
      </>

   )
}

export default ImageComponent