"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { CameraIcon, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { CldUploadButton } from "next-cloudinary"

import dynamic from "next/dynamic"

const Editor = dynamic(() => import("@/components/editor"), { ssr: false })

interface Image {
  url: string
  publicId: string
}

const Post = () => {
  const [progress, setProgress] = useState(50)
  const [text, setText] = useState("")
  const maxImages = 5 // Limite de imagens

  const [images, setImages] = useState<Image[]>([])

  const handleAddImage = (result: any) => {
    const uploadedImages = result.info.files || [result.info]

    // Preparar novas imagens para adicionar
    const newImages: Image[] = uploadedImages.map((file: any) => ({
      url: file.secure_url,
      publicId: file.public_id,
    }))

    // Log para verificar o que está sendo recebido
    console.log("New Images:", newImages)

    setImages((prevImages) => {
      const existingImageUrls = new Set(prevImages.map((img) => img.url))

      // Log para verificar imagens já existentes
      console.log("Existing Image URLs:", existingImageUrls)

      const filteredNewImages = newImages.filter(
        (img) => !existingImageUrls.has(img.url),
      )

      // Log para verificar novas imagens filtradas
      console.log("Filtered New Images:", filteredNewImages)

      if (filteredNewImages.length + prevImages.length > maxImages) {
        alert("Você atingiu o limite máximo de imagens.")
        return prevImages
      }

      // Log para verificar as imagens que serão adicionadas
      console.log("Images to be added:", [...prevImages, ...filteredNewImages])

      return [...prevImages, ...filteredNewImages]
    })
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

  const handleCancelUpload = () => {
    images.forEach((image) => {
      deleteImage(image.publicId)
    })
    setImages([]) // Clear the images array
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

  const handleAddPost = () => {
    toast.loading("Adicionando post...")
    setTimeout(() => {
      toast.success("Post adicionado com sucesso!")
      toast.dismiss()
    }, 400)
  }

  useEffect(() => {
    const deleteImagesOnExit = async () => {
      for (const image of images) {
        await deleteImage(image.publicId) // Exclui cada imagem usando o publicId
      }
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = "Você tem alterações não salvas. Deseja sair?"

      // Tenta excluir imagens ao sair da página
      deleteImagesOnExit()
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      handleCancelUpload() // Garante que imagens sejam removidas ao cancelar a ação
    }
  }, [images])

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
            <CldUploadButton
              className="flex w-full items-center justify-center gap-2 rounded bg-red-500 p-2 text-white"
              uploadPreset="trocastore_upload"
              options={{
                resourceType: "image",
                maxFiles: maxImages - images.length,
              }} // Restringir a uploads de imagens
              onUpload={handleAddImage}
            >
              <CameraIcon className="h-6 w-6" /> Carregar imagens
            </CldUploadButton>

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
