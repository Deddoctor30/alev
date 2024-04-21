import { navLinks } from "@/data/navLinks"
import Link from "./Link"

const Header = () => {
  return (
    <header>
      <div className="">
         {navLinks
         .filter(link => link.href !== '/')
         .map(link => 
             <Link href={link.href} key={link.title}>{link.title}</Link>           
         )}
      </div>
    </header>
  )
}

export default Header