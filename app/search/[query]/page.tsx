import { availableItems } from "@/utils/data"
import React from "react"
import CardProduct from "@/components/card-product"
import SearchComponent from "@/components/search-component"
import QuickSearchComponent from "@/components/quick-search-component"

const Home = ({ params }: { params: { query: string } }) => {
  const query = decodeURIComponent(params.query)

  const results = availableItems.filter((item) =>
    item.productName.toLowerCase().includes(query.toLowerCase()),
  )

  if (results.length === 0) {
    return (
      <div className="wrapper">
        <SearchComponent />
        <QuickSearchComponent />
        <p>Nenhum resultado encontrado</p>
      </div>
    )
  }

  return (
    <div className="wrapper">
      <SearchComponent />
      {/* <QuickSearchComponent /> */}
      <p className="my-4 text-sm text-gray-400">Resutados para: {query}</p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {results.map((item) => (
          <CardProduct item={item} />
        ))}
      </div>
    </div>
  )
}

export default Home
