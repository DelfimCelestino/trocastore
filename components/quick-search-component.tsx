import { quicksearch } from "@/utils/data"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const QuickSearchComponent = () => {
  return (
    <div className="my-6 flex flex-wrap items-center gap-2">
      {quicksearch.map((item) => (
        <Link key={item} href={`/search/${encodeURIComponent(item)}`}>
          <Badge className="cursor-pointer p-2" variant="secondary">
            {item}
          </Badge>
        </Link>
      ))}
    </div>
  )
}

export default QuickSearchComponent
