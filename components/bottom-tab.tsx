"use client"

import { cn } from "@/lib/utils"
import { HomeIcon, SearchIcon, User2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Bottomtab = () => {
  const currentRoute = usePathname()

  const iconSize = "h-6 w-6"
  const links = [
    {
      name: "Home",
      href: "/",
      icon: <HomeIcon className={iconSize} />,
    },
    {
      name: "Me",
      href: "/me",
      icon: <User2 className={iconSize} />,
    },
  ]
  return (
    <div
      className={
        currentRoute !== "/"
          ? "hidden"
          : "fixed bottom-0 left-0 right-0 flex h-16 items-center justify-around border-t bg-background lg:hidden"
      }
    >
      {links.map((link) => (
        <Link
          className={cn(
            currentRoute === link.href
              ? "text-primary"
              : "text-muted-foreground",
          )}
          href={link.href}
          key={link.name}
        >
          {link.icon}
        </Link>
      ))}
    </div>
  )
}

export default Bottomtab
