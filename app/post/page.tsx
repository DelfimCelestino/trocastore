"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { X } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { CldUploadWidget } from "next-cloudinary"
import dynamic from "next/dynamic"

const Editor = dynamic(() => import("@/components/editor"), { ssr: false })

interface Image {
  url: string
  publicId: string
}

const Post = () => {
  const [progress, setProgress] = useState(50)
  const [text, setText] = useState("")
  const [images, setImages] = useState<Image[]>([])
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

        if (progress > 50) {
          setProgress(50)
        }
        toast.info(
          "Limite de imagens atingido. As imagens mais antigas foram excluídas.",
        )
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
    const deleteImagesOnExit = async () => {
      for (const image of images) {
        await deleteImage(image.publicId)
      }
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = "Você tem alterações não salvas. Deseja sair?"

      deleteImagesOnExit()
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      deleteImagesOnExit()
    }
  }, [])

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
          <>
            <p className="text-sm">Descreva o seu item, condições etc...</p>
            <Editor text={text} setText={setText} />
          </>
        )}
      </div>

      {progress < 100 ? (
        <div className="fixed bottom-0 left-0 right-0 flex h-16 items-center justify-between border-t px-4">
          <Button asChild variant={"outline"}>
            <Link href={"/"}>Sair</Link>
          </Button>
          <Button onClick={handleProgress}>Avançar</Button>
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
