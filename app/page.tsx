import React from "react"
import CardProduct from "@/components/card-product"
import SearchComponent from "@/components/search-component"
import QuickSearchComponent from "@/components/quick-search-component"
import Footer from "@/components/footer"
import { db } from "@/lib/prisma"

const Home = async () => {
  const products = await db.products.findMany({
    include: {
      PorductImages: true, // Corrigido para refletir o nome correto do relacionamento
      user: true,
    },
  })

  return (
    <div className="wrapper">
      <SearchComponent />
      <QuickSearchComponent />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((item) => (
          <CardProduct key={item.id} item={item} />
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default Home
