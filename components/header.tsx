import Link from "next/link"
import { Button } from "./ui/button"
import { Camera } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
const Header = () => {
  return (
    <div className="top fixed z-20 flex h-16 w-full items-center justify-between bg-background px-4">
      <Link className="text-lg font-bold uppercase lg:text-2xl" href={"/"}>
        TrocaStore
      </Link>

      <div className="flex items-center gap-4">
        <Button variant={"outline"} size={"icon"}>
          <Camera className="h-6 w-6" />
        </Button>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default Header
