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

  // console.log(pathname.slice(1).includes(href.slice(9)));

  console.log('pathname', pathname.slice(1));
  console.log('href', href.slice(9));

  // const dada = "/awdwadawd";
  // const nene = "";

  // console.log(dada.includes(nene));

  if (isInternalLink) {
    return (
      <Link
        id={pathname.slice(1).includes(href.slice(9).length === 0 ? '!' : href.slice(9)) ? styles.active_link : ""}
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
