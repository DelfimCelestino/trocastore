import { availableItems } from "@/utils/data"

import React from "react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import CarouselComponet from "@/components/carousel-component"
import { db } from "@/lib/prisma"

const Product = async ({ params }: { params: { slug: string } }) => {
  const slug = decodeURIComponent(params.slug)
  const product = await db.products.findUnique({
    include: {
      PorductImages: true, // Corrigido para refletir o nome correto do relacionamento
      user: true,
    },
    where: {
      slug,
    },
  })

  if (!product) return notFound()

  return (
    <div className="wrapper grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-8">
      <div>
        <CarouselComponet product={product} />
      </div>
      <div className="p-4">
        <div>
          <Button
            className={cn(
              "w-full uppercase",
              product.offer && "bg-green-500 hover:bg-green-500",
            )}
            variant={"outline"}
          >
            {product.offer ? "Solicitar Ofertar" : "Solicitar troca"}
          </Button>
        </div>
        <div className="mt-4">
          <p className="text-xs text-gray-500">
            Posted by: {product.user.name}
          </p>
          {/* <p className="text-xs text-gray-500">Location: {product.province}</p> */}
          {product.offer && (
            <div className="my-4 rounded bg-orange-500 p-4">
              <p className="text-xs">
                O proprietário de {product.name} esta ofertando esse produto, ou
                seja o produto esta disponível para ser entregue sem alguma
                troca
              </p>
            </div>
          )}
        </div>
        <h1 className="my-4 text-xl font-bold lg:text-2xl">{product.name}</h1>
        <div
          className="mt-2 text-sm"
          dangerouslySetInnerHTML={{ __html: product.content }}
        />
      </div>
    </div>
  )
}

export default Product
