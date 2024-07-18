'use client'
import Image from "next/image";
import { useState } from "react";

const ImageComponent = ({ src, width, height, alt, className, priority }: { src: string, width: number, height: number, alt: string, className?: string, priority?: boolean }) => {
      const [err, setErr] = useState(false)

   return (
      <>
         {!err 
            ? 
               <Image
                  priority={priority}
                  className={className}
                  src={src}
                  width={width}
                  height={height}
                  alt={alt}
                  onError={() => setErr(flag => !flag)}
               />
            :
               <img className={className} src={src.slice(7)} alt={alt}/>
      }
      </>

   )
}

export default ImageComponent