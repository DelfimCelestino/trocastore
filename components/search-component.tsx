"use client"

import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"

const SearchComponent = () => {
  const [search, setSeach] = useState("")

  const router = useRouter()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search/${encodeURIComponent(search)}`)
  }

  return (
    <form onSubmit={onSubmit} className="my-6 grid gap-2">
      <h1>Quais itens você tem em mente para trocar hoje?</h1>
      <Input
        required
        value={search}
        onChange={(e) => setSeach(e.target.value)}
        className="bg-secondary"
        placeholder="O que deseja trocar, pesquise aqui..."
      />
    </form>
  )
}

export default SearchComponent
