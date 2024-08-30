import Link from "next/link"

const links = [
  {
    name: "TOdos direitos reservados@DenyCelestino",
    href: "https://delfim.vercel.app",
  },
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
    <div className="mt-8 flex flex-wrap items-center gap-2">
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
  )
}

export default Footer
