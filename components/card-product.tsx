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
import { Badge } from "./ui/badge"
interface AvailableItem {
  productName: string
  slug: string
  postedBy: string
  province: string
  photos: string[]
  description: string
  offer: boolean
}
const CardProduct = ({ item }: { item: AvailableItem }) => {
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
    <Link href={`/product/${encodeURIComponent(item.slug)}`}>
      <Card className="flex min-h-[350px] w-full max-w-sm flex-col lg:min-h-[480px]">
        <Carousel setApi={setApi} className="relative w-full">
          <CarouselContent>
            {item.photos.map((item, index) => (
              <CarouselItem key={index}>
                <div className="h-[200px] rounded-tl rounded-tr lg:h-[300px]">
                  <img
                    className="h-full w-full rounded-tl rounded-tr object-cover"
                    src={item}
                    alt=""
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {item.photos.length > 1 && (
            <div className="absolute right-2 top-2 rounded bg-black/80 p-2 text-xs text-muted-foreground">
              {current} de {count}
            </div>
          )}
        </Carousel>
        <CardContent>
          <div className="grid gap-1 py-3">
            <p className="flex items-center gap-1 truncate text-xs text-gray-400">
              {item.province}
              <MapPin className="h-4 w-4" />
            </p>
            <h1 className="truncate font-bold uppercase">{item.productName}</h1>
            <p className="text-sm text-gray-400 md:text-sm">
              {item.description.length > 56
                ? item.description.substring(0, 56) + "..."
                : item.description}
            </p>
            {item.offer && (
              <div>
                <Badge className="bg-green-500 text-zinc-50">Ofertando</Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default CardProduct
