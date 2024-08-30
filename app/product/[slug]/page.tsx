"use client"

import { availableItems } from "@/utils/data"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import React from "react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const Product = ({ params }: { params: { slug: string } }) => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const slug = decodeURIComponent(params.slug)
  const product = availableItems.find((item) => item.slug === slug)

  if (!product) return notFound()

  return (
    <div className="wrapper grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-8">
      <div>
        <Carousel setApi={setApi} className="relative w-full">
          <CarouselContent>
            {product.photos.map((item, index) => (
              <CarouselItem key={index}>
                <div className="h-[400px] lg:h-[450px]">
                  <img
                    className="h-full w-full object-contain"
                    src={item}
                    alt={product.productName}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {product.photos.length > 1 && (
            <div className="absolute right-2 top-2 rounded bg-black/80 p-2 text-xs text-muted-foreground">
              {current} de {count}
            </div>
          )}
          <div className="hidden lg:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
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
          <p className="text-xs text-gray-500">Posted by: {product.postedBy}</p>
          <p className="text-xs text-gray-500">Location: {product.province}</p>
          <div className="bg-oraange-500 my-4 rounded p-4">
            <p className="text-xs">
              O proprietário de {product.productName} esta ofertando esse
              produto, ou seja o produto esta disponível para ser entregue sem
              alguma troca
            </p>
          </div>
        </div>
        <h1 className="text-xl font-bold lg:text-2xl">{product.productName}</h1>
        <p className="mt-2 text-sm text-gray-600">{product.description}</p>
      </div>
    </div>
  )
}

export default Product
