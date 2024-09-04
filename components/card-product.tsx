"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProductImages, Products, User } from "@prisma/client"
import { truncateHTML } from "@/lib/utils"

interface EnhancedProducts extends Products {
  PorductImages: ProductImages[] // Manter o nome correto conforme o model do Prisma
  user: User
}

interface AvailableItem {
  item: EnhancedProducts
}

const CardProduct = ({ item }: AvailableItem) => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const truncatedContent = truncateHTML(item.content, 56)

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <Link href={`/product/${encodeURIComponent(item.slug)}`}>
      <Card className="flex min-h-[350px] w-full max-w-sm flex-col border-none lg:min-h-[480px]">
        <Carousel setApi={setApi} className="relative w-full">
          <CarouselContent>
            {item.PorductImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="h-[200px] rounded-tl rounded-tr lg:h-[300px]">
                  <img
                    className="h-full w-full rounded-tl rounded-tr object-cover"
                    src={image.url}
                    alt=""
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {item.PorductImages.length > 1 && (
            <div className="absolute right-2 top-2 rounded bg-black/80 p-2 text-xs text-muted-foreground">
              {current} de {count}
            </div>
          )}
          {item.offer && (
            <div className="absolute left-2 top-2">
              <Badge className="bg-green-500 text-zinc-50">Ofertando</Badge>
            </div>
          )}
        </Carousel>
        <CardContent>
          <div className="grid gap-1 py-3">
            {/* <p className="flex items-center gap-1 truncate text-xs text-gray-400">
              {item.province}
              <MapPin className="h-4 w-4" />
            </p> */}
            <h1 className="truncate font-bold uppercase">{item.name}</h1>

            <div dangerouslySetInnerHTML={{ __html: truncatedContent }} />
            {/* 
            <p>{item.content}</p> */}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default CardProduct
