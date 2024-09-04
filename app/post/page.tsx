"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LogInIcon, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { CldUploadWidget } from "next-cloudinary"
import dynamic from "next/dynamic"
import { useSession } from "next-auth/react"
import Spinner from "@/components/spinner"
import SignInDialog from "@/components/sign-in-dialog"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { createPost } from "@/actions/create-post"

const Editor = dynamic(() => import("@/components/editor"), { ssr: false })

interface Image {
  url: string
  publicId: string
}

const Post = () => {
  const { data, status } = useSession()

  const [progress, setProgress] = useState(50)
  const [name, setName] = useState("")
  const [text, setText] = useState("")
  const [images, setImages] = useState<Image[]>([])
  const [publicIds, setPublicIds] = useState<string[]>([])

  const maxImages = 5 // Limite de imagens

  const handleAddImage = async (result: any) => {
    const uploadedImages = Array.isArray(result.info.files)
      ? result.info.files
      : [result.info]

    const newImages: Image[] = uploadedImages.map((file: any) => ({
      url: file.secure_url,
      publicId: file.public_id,
    }))

    setImages((prevImages) => {
      const uniqueImages = newImages.filter(
        (img) =>
          !prevImages.some((prevImg) => prevImg.publicId === img.publicId),
      )

      let updatedImages = [...prevImages, ...uniqueImages]

      // Armazena os publicIds no localStorage
      const existingPublicIds = JSON.parse(
        localStorage.getItem("publicIds") || "[]",
      ) as string[]
      const newPublicIds = uniqueImages.map((img) => img.publicId)

      // Atualiza os publicIds, removendo duplicatas
      const updatedPublicIds = Array.from(
        new Set([...existingPublicIds, ...newPublicIds]),
      )
      localStorage.setItem("publicIds", JSON.stringify(updatedPublicIds))
      setPublicIds(updatedPublicIds)

      if (updatedImages.length > maxImages) {
        // Identifica as imagens que precisam ser removidas
        const imagesToRemove = updatedImages.slice(
          0,
          updatedImages.length - maxImages,
        )

        // Remove as imagens mais antigas do servidor
        imagesToRemove.forEach(async (image) => {
          try {
            await deleteImage(image.publicId) // Chama deleteImage e aguarda sua conclusão
            console.log(`Imagem removida: ${image.publicId}`)
          } catch (error) {
            console.error(`Erro ao remover a imagem ${image.publicId}:`, error)
          }
        })

        // Mantém apenas as últimas maxImages imagens
        updatedImages = updatedImages.slice(-maxImages)
        // Atualiza o localStorage
        const remainingPublicIds = updatedPublicIds.filter(
          (id) => !imagesToRemove.some((img) => img.publicId === id),
        )
        localStorage.setItem("publicIds", JSON.stringify(remainingPublicIds))
        setPublicIds(remainingPublicIds)

        setProgress(50)

        toast.info("So pode cadastrar no maximo 5 imagens.")
      }

      return updatedImages
    })
  }

  const handleWidgetUpload = (result: any) => {
    if (result.event === "success") {
      console.log("Upload bem-sucedido:", result.info)
      handleAddImage(result)
    } else {
      console.error("Erro no upload:", result)
    }
  }
  const deleteImage = async (publicId: string) => {
    try {
      const response = await fetch("/api/delete-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete image")
      }
    } catch (error) {
      console.error("Error deleting image:", error)
    }
  }

  useEffect(() => {
    // Recupera os publicIds do localStorage ao montar o componente
    const storedPublicIds = JSON.parse(
      localStorage.getItem("publicIds") || "[]",
    ) as string[]
    setPublicIds(storedPublicIds)
  }, [])
  useEffect(() => {
    deleteImagesOnExit()
    // Listener para o evento de antes de descarregar a página
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = "Você tem alterações não salvas. Deseja sair?"
    }

    // Registra o listener uma única vez
    window.addEventListener("beforeunload", handleBeforeUnload)

    // Limpa o listener e deleta imagens apenas ao desmontar o componente ou sair da página
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, []) // Dependências vazias para garantir que seja executado apenas uma vez

  const deleteImagesOnExit = async () => {
    const publicIds = JSON.parse(
      localStorage.getItem("publicIds") || "[]",
    ) as string[]

    for (const publicId of publicIds) {
      try {
        await deleteImage(publicId)
        console.log(`Imagem deletada do localStorage: ${publicId}`)
      } catch (error) {
        console.error(
          `Erro ao deletar a imagem do localStorage ${publicId}:`,
          error,
        )
      }
    }

    // Limpa o localStorage após tentar deletar as imagens
    localStorage.removeItem("publicIds")
  }

  const handleProgress = () => {
    setProgress(progress + 50)
  }

  const handleRevert = () => {
    setProgress(progress - 50)
  }
  const handleRemoveImage = (index: number) => {
    const imageToRemove = images[index]
    deleteImage(imageToRemove.publicId)
    setImages(images.filter((_, i) => i !== index))
  }

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !text) {
      toast.error("Preencha todos os campos")
      return
    }
    try {
      toast.loading("Criando o post...")
      await createPost({
        images,
        name: name,
        content: text,
      })

      toast.success("Post criado com sucesso")
      handleRest()
    } catch (error) {
      toast.error("Erro ao criar o post")
    } finally {
      toast.dismiss()
    }
  }

  const handleRest = () => {
    localStorage.removeItem("publicIds")
    setName("")
    setText("")
    setImages([])
    setProgress(50)
    setPublicIds([])
  }

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="wrapper flex items-center justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              Iniciar sessão <LogInIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%]">
            <SignInDialog />
          </DialogContent>
        </Dialog>
      </div>
    )
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
            <CldUploadWidget
              uploadPreset="trocastore_upload"
              onSuccess={handleWidgetUpload}
            >
              {({ open }) => (
                <Button onClick={() => open()}>Carregar imagens</Button>
              )}
            </CldUploadWidget>
            <div className="mt-10 grid gap-2">
              {images.map((item, index) => (
                <div
                  className="flex w-full items-center justify-between"
                  key={index}
                >
                  <div className="h-10 w-10 border border-white lg:h-20 lg:w-20">
                    <img
                      className="h-full w-full object-cover"
                      src={item.url}
                    />
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
          <form className="grid gap-2" onSubmit={handleAddPost}>
            <Input
              required
              className="border border-slate-50"
              placeholder="Digite o nome do item"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <p className="text-sm">Descreva o seu item, condições etc...</p>
            <Editor text={text} setText={setText} />

            {progress > 50 && (
              <div className="fixed bottom-0 left-0 right-0 flex h-16 items-center justify-between border-t px-4">
                <Button onClick={handleRevert} variant={"outline"}>
                  Voltar
                </Button>
                <Button type="submit">Enviar</Button>
              </div>
            )}
          </form>
        )}
      </div>

      {progress < 100 && (
        <div className="fixed bottom-0 left-0 right-0 flex h-16 items-center justify-between border-t px-4">
          <Button asChild variant={"outline"}>
            <Link href={"/"}>Sair</Link>
          </Button>
          {images.length > 0 && (
            <Button onClick={handleProgress}>Avançar</Button>
          )}
        </div>
      )}
    </div>
  )
}

export default Post
