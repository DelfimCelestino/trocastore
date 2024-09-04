"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { ProductImages, Products, User } from "@prisma/client"
import React from "react"
interface EnhancedProducts extends Products {
  PorductImages: ProductImages[] // Manter o nome correto conforme o model do Prisma
  user: User
}

interface AvailableItem {
  product: EnhancedProducts
}
const CarouselComponet = ({ product }: AvailableItem) => {
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
  return (
    <Carousel setApi={setApi} className="relative w-full">
      <CarouselContent>
        {product.PorductImages.map((item, index) => (
          <CarouselItem key={index}>
            <div className="h-[400px] lg:h-[450px]">
              <img
                className="h-full w-full object-contain"
                src={item.url}
                alt={product.id.toString()}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {product.PorductImages.length > 1 && (
        <div className="absolute right-2 top-2 rounded bg-black/80 p-2 text-xs text-muted-foreground">
          {current} de {count}
        </div>
      )}
      <div className="hidden lg:block">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  )
}

export default CarouselComponet
