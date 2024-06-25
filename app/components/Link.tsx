"use client"
import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, Dispatch, SetStateAction } from 'react'
import { usePathname } from 'next/navigation'

const CustomLink = ({ setBurgerActive, href, ...rest }: Dispatch<SetStateAction<boolean>> & LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')
  const pathname = usePathname();

  const pathnameValue = pathname.slice(0, 2)
  const hrefValue = href.slice(0, 2)

  if (isInternalLink) {
    return <Link id={hrefValue === pathnameValue ? 'active_link' : '' } onClick={() => setBurgerActive(false)} href={href} {...rest} />
  }

  if (isAnchorLink) {
    return <a href={href} onClick={() => setBurgerActive(false)} {...rest} />
  }

  return <a target="_blank" onClick={() => setBurgerActive(false)} href={href} {...rest} />
}

export default CustomLink
