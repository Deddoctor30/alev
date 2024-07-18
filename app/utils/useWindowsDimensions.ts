import { useEffect, useState } from 'react';
export const useWindowDimensions = () => {
   const hasWindow = typeof window !== "undefined"

   function getWindowDimensions() {
     const widthW = hasWindow ? window.innerWidth : null
     const heightW = hasWindow ? window.innerHeight : null
     return {
       widthW,
       heightW,
     }
   }

   const [windowDimensions, setWindowDimensions] = useState(
     getWindowDimensions()
   )

   useEffect(() => {
     if (hasWindow) {
       function handleResize() {
         setWindowDimensions(getWindowDimensions())
       }

       window.addEventListener("resize", handleResize)
       return () => window.removeEventListener("resize", handleResize)
     }
   }, [hasWindow])

   return windowDimensions
 }