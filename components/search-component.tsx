import { Input } from "@/components/ui/input"

const SearchComponent = () => {
  return (
    <div className="my-6 grid gap-2">
      <h1>Quais itens você tem em mente para trocar hoje?</h1>
      <Input
        className="bg-secondary"
        placeholder="O que deseja trocar, pesquise aqui..."
      />
    </div>
  )
}

export default SearchComponent
