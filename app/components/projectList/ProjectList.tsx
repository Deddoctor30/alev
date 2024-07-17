'use client'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import styles from "./projectList.module.scss";
import { getOnProjectsPosts } from '@/app/actions/postActions';
import { Post } from '@/types/post';
import { useInView } from 'react-intersection-observer'

const increace = 10;

const ProjectList = () => {
   const { ref, inView } = useInView()
   const [take, setTake] = useState(increace)
   const [projects, setProjects] = useState<Post[] | null>(null)

   useEffect(() => {
      const fetchData = async () => {
         const fetchedData = await getOnProjectsPosts(take)
         setProjects(fetchedData)
      }
      fetchData()
   }, [])

   useEffect(() => {
      if (inView) {
         const fetchData = async () => {
            const fetchedData = await getOnProjectsPosts(take)
            setProjects(fetchedData)
         }
         fetchData()
         setTake(item => item + increace)
      }
   }, [inView])

   return (
      <div className={styles.items}>
         {projects && projects.map((item) => (
            <div key={item.id} className={`${styles.items__item} ${styles.item}`}>
               <Link className={styles.item__link} href={`/projects/${item.type.toLowerCase()}/${item.id}`}>
                  <div className={styles.item__inner}>
                     <p className={styles.item__subtitle}>{item.title.length > 100 ? `${item.title.slice(0, 100)}...` : item.title}</p>
                  </div>
                  <Image
                     className={styles.item__img}
                     src={`/images/${item?.thumbnail[0]}`}
                     width={600}
                     height={400}
                     alt={item.title}
                  />
               </Link>
            </div>
         ))}
         <p ref={ref}></p>
      </div>
   )
}

export default ProjectList