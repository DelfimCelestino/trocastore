"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { Camera, LogInIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut, useSession } from "next-auth/react"
import { Dialog, DialogContent } from "./ui/dialog"
import { DialogTrigger } from "@radix-ui/react-dialog"
import SignInDialog from "./sign-in-dialog"
const Header = () => {
  const { data } = useSession()
  const handleLogoutClick = () => signOut()
  return (
    <div className="top fixed z-20 flex h-16 w-full items-center justify-between bg-background px-4">
      <Link className="text-lg font-bold uppercase lg:text-2xl" href={"/"}>
        TrocaStore
      </Link>

      <div className="flex items-center gap-4">
        <Button variant={"outline"} size={"icon"}>
          <Camera className="h-6 w-6" />
        </Button>

        {data?.user ? (
          <>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </>
        ) : (
          <>
            <h2 className="font-bold">Olá, faça seu login!</h2>
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
