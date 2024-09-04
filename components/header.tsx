"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import SignInDialog from "@/components/sign-in-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Camera, LogInIcon, LogOutIcon } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
  const { data } = useSession()
  const handleLogoutClick = () => signOut()
  return (
    <div className="top fixed z-20 flex h-16 w-full items-center justify-between bg-background px-4">
      <Link className="text-lg font-bold uppercase lg:text-2xl" href={"/"}>
        TrocaStore
      </Link>

      <div className="flex items-center gap-4">
        {data?.user && (
          <Button asChild variant={"outline"} size={"icon"}>
            <Link href={"/post"}>
              <Camera className="h-6 w-6" />
            </Link>
          </Button>
        )}

        {data?.user ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={data?.user?.image ?? ""} />
                  <AvatarFallback>{data.user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <p className="truncate text-xs text-muted-foreground">
                  {data?.user.name}
                </p>{" "}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogoutClick}>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Terminar sessão</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <h2 className="text-xs font-bold lg:text-sm">
              Olá, faça seu login!
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"outline"} size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
