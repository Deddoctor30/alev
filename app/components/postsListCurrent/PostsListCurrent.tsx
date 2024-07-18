'use client'
import Image from "next/image";
import Link from "next/link";
import styles from "./postListCurrent.module.scss";
import { getPostsCurrent } from "@/app/actions/postActions";
import { useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer'
import { Post } from "@prisma/client";
import ImageComponent from "../imageComponent/ImageComponent";
type Type = "HOUSE" | "MARKET" | "OFFICE" | "PUBLIC";

const increace = 10;

const PostsListCurrent = ({ type }: { type: Type }) => {
  const { ref, inView } = useInView()
  const [take, setTake] = useState(increace)
  const [projects, setProjects] = useState<Post[] | null>(null)

  useEffect(() => {
     const fetchData = async () => {
        const fetchedData = await getPostsCurrent(type, take)
        setProjects(fetchedData)
     }
     fetchData()
  }, [])

  useEffect(() => {
     if (inView) {
        const fetchData = async () => {
           const fetchedData = await getPostsCurrent(type, take)
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
        <Link
          className={styles.item__link}
          href={`/projects/${type.toLowerCase()}/${item.id}`}
        >
          <div className={styles.item__inner}>
            <p className={styles.item__subtitle}>{item.title.length > 100 ? `${item.title.slice(0, 100)}...` : item.title}</p>
          </div>
          <ImageComponent
            className={styles.item__img}
            src={`/images/${item?.thumbnail[0]}`}
            width={600}
            height={400}
            alt={item.title}
          />
          {/* <Image
            className={styles.item__img}
            src={`/images/${item?.thumbnail[0]}`}
            width={600}
            height={400}
            alt={item.title}
          /> */}
        </Link>
      </div>
    ))}
    <p ref={ref}></p>
  </div>
  )
}

export default PostsListCurrent