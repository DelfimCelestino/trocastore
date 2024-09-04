"use server"

import { db } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import slugify from "slugify"

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

  const slug = await generateUniqueSlug(name)

  try {
    const product = await db.products.create({
      data: {
        name,
        slug,
        content,
        userId: (user.user as any).id,
      },
    })

    const productImages = await db.productImages.createMany({
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

async function generateUniqueSlug(name: string) {
  let slug = slugify(name, { lower: true })
  let uniqueSlug = slug
  let count = 1

  while (await db.products.findFirst({ where: { slug: uniqueSlug } })) {
    uniqueSlug = `${slug}-${count}`
    count++
  }

  return uniqueSlug
}
