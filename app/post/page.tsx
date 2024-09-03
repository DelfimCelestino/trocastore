"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { LinkIcon, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { toast } from "sonner"

import dynamic from "next/dynamic"

const Editor = dynamic(() => import("@/components/editor"), { ssr: false })
const post = [
  "https://techrecomenda.com/wp-content/uploads/2024/06/Design-sem-nome-12.jpg",
  "https://workspace.com.pk/wp-content/uploads/2023/03/gaming-chair-post-07-700x700-1.jpg",
]

const Post = () => {
  const [progress, setProgress] = useState(50)
  const [iamgeUrl, setImageUrl] = useState("")
  const [text, setText] = useState("")

  const [images, setImages] = useState<string[]>(post)

  const handleAddImages = (e: React.FormEvent) => {
    e.preventDefault()
    setImages([...images, iamgeUrl])
    setImageUrl("")
  }

  const handleProgress = () => {
    setProgress(progress + 50)
  }

  const handleRevert = () => {
    setProgress(progress - 50)
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleAddPost = () => {
    toast.loading("Adicionando post...")
    setTimeout(() => {
      toast.success("Post adicionado com sucesso!")
      toast.dismiss()
    }, 400)
  }

  return (
    <div className="wrapper">
      <div className="grid gap-2">
        <div>
          <p className="text-sm text-muted-foreground">
            Progresso da postagem: {progress}%
          </p>
          <Progress value={progress} />
        </div>

        {progress < 100 ? (
          <>
            <h1 className="font-bold">Adicionar imagens</h1>
            <form
              onSubmit={handleAddImages}
              className="flex items-center justify-between gap-2"
            >
              <Input
                value={iamgeUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Digite o link da imagem"
              />
              <Button onClick={handleAddImages} size={"icon"}>
                <LinkIcon className="h-4 w-4" />
              </Button>
            </form>
            <div className="mt-10 grid gap-2">
              {images.map((item, index) => (
                <div
                  className="flex w-full items-center justify-between"
                  key={index}
                >
                  <div className="h-10 w-10 border border-white lg:h-20 lg:w-20">
                    <img className="h-full w-full object-cover" src={item} />
                  </div>
                  <X
                    onClick={() => handleRemoveImage(index)}
                    className="h-4 w-4 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-sm">Descreva o seu item, condições etc...</p>
            <Editor text={text} setText={setText} />
            {/* <Textarea
              className="min-h-[200px] w-full"
              placeholder="Descreva o seu item..."
            /> */}
          </>
        )}
      </div>

      {progress < 100 ? (
        <div className="fixed bottom-0 left-0 right-0 flex h-16 items-center justify-between border-t px-4">
          <Button asChild variant={"outline"}>
            <Link href={"/"}>Sair</Link>
          </Button>
          <Button onClick={handleProgress}>Avancar</Button>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 right-0 flex h-16 items-center justify-between border-t px-4">
          <Button onClick={handleRevert} variant={"outline"}>
            Voltar
          </Button>
          <Button onClick={handleAddPost}>Enviar</Button>
        </div>
      )}
    </div>
  )
}

export default Post
