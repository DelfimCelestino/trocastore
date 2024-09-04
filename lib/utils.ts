import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function truncateHTML(html: string, maxLength: number): string {
  const div = document.createElement("div")
  div.innerHTML = html

  let length = 0
  let truncatedHTML = ""

  function traverseNodes(node: ChildNode): string {
    if (length >= maxLength) return ""

    if (node.nodeType === Node.TEXT_NODE) {
      const textContent = node.textContent || ""
      const remainingLength = maxLength - length

      if (textContent.length > remainingLength) {
        length += remainingLength
        return textContent.substring(0, remainingLength) + "..."
      } else {
        length += textContent.length
        return textContent
      }
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement
      let tagName = element.tagName.toLowerCase()
      let openingTag = `<${tagName}${Array.from(element.attributes)
        .map((attr) => ` ${attr.name}="${attr.value}"`)
        .join("")}>`

      let closingTag = `</${tagName}>`

      let innerHTML = openingTag

      for (const child of Array.from(element.childNodes)) {
        innerHTML += traverseNodes(child)
        if (length >= maxLength) break
      }

      innerHTML += closingTag
      return innerHTML
    }

    return ""
  }

  for (const child of Array.from(div.childNodes)) {
    truncatedHTML += traverseNodes(child)
    if (length >= maxLength) break
  }

  return truncatedHTML
}
