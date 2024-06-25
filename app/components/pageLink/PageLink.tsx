"use client";
import Link from "next/link";
import type { LinkProps } from "next/link";
import { AnchorHTMLAttributes, Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";

import styles from "./pageLink.module.scss";

const PageLink = ({
  href,
  ...rest
}: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");
  const pathname = usePathname();

  const pathnameValue = pathname.replace(/[0-9]/g, '').at(-1) === '/' ? pathname.replace(/[0-9]/g, '').slice(0, -1) : pathname.replace(/[0-9]/g, '')
  const hrefValue = href.replace(/[0-9]/g, '')

  if (isInternalLink) {
    return (
      <Link
        id={pathnameValue === hrefValue ? styles.active_link : ""}
        href={href}
        {...rest}
      />
    );
    // return <Link id={pathname === href ? styles.active_link : ''} href={href} {...rest} />
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />;
  }

  return <a target="_blank" href={href} {...rest} />;
};

export default PageLink;
