import { availableItems } from "@/utils/data"
import React from "react"
import CardProduct from "@/components/card-product"
import SearchComponent from "@/components/search-component"
import QuickSearchComponent from "@/components/quick-search-component"
import Footer from "@/components/footer"

const Home = () => {
  return (
    <div className="wrapper">
      <SearchComponent />
      <QuickSearchComponent />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {availableItems.map((item, index) => (
          <CardProduct key={index} item={item} />
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default Home
