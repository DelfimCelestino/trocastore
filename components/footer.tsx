import Link from "next/link"

const links = [
  {
    name: "Termos e condições",
    href: "/terms",
  },
  {
    name: "Política de privacidade",
    href: "/privacy",
  },
  {
    name: "Política de Cookies",
    href: "/cookies",
  },
]
const Footer = () => {
  return (
    <div className="grid gap-2">
      <div className="mt-8 flex flex-wrap items-center gap-2 rounded bg-secondary p-4">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="cursor-pointer text-sm text-muted-foreground underline duration-300 hover:text-primary"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <p className="text-center text-sm">
        Todos direitos reservados © LhamaTech2024
      </p>
    </div>
  )
}

export default Footer
