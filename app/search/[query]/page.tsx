import { availableItems } from "@/utils/data"
import React from "react"
import CardProduct from "@/components/card-product"
import SearchComponent from "@/components/search-component"
import QuickSearchComponent from "@/components/quick-search-component"
import { db } from "@/lib/prisma"

const Search = async ({ params }: { params: { query: string } }) => {
  const query = decodeURIComponent(params.query)

  const results = await db.products.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
          },
        },
        {
          content: {
            contains: query,
          },
        },
      ],
    },
    include: {
      PorductImages: true, // Corrigido para refletir o nome correto do relacionamento
      user: true,
    },
  })

  if (results.length === 0) {
    return (
      <div className="wrapper">
        <SearchComponent />
        <QuickSearchComponent />
        <p className="my-4 text-sm text-gray-400">
          Nenhum resultado encontrado...
        </p>
      </div>
    )
  }

  return (
    <div className="wrapper">
      <SearchComponent />
      {/* <QuickSearchComponent /> */}
      <p className="my-4 text-sm text-gray-400">Resutados para: {query}</p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {results.map((item, index) => (
          <CardProduct key={index} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Search
