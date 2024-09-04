"use server"

import { db } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

interface Images {
  url: string
  publicId: string
}
interface CreatePostParams {
  images: Images[]
  name: string
  content: string
}
export const createPost = async (params: CreatePostParams) => {
  const { images, name, content } = params

  const user = await getServerSession(authOptions)
  if (!user) {
    throw new Error("Usuario não autenticado")
  }

  try {
    const product = await db.products.create({
      data: {
        name,
        content,
        userId: (user.user as any).id,
      },
    })

    const productImages = await db.porductImages.createMany({
      data: images.map((image) => ({
        productId: product.id,
        url: image.url,
        publicId: image.publicId,
      })),
    })

    console.log(product)
    console.log(productImages)
  } catch (error: any) {
    throw new Error(error)
  }
}
