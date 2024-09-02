"use client"

import Quill, { QuillOptions } from "quill"
import "quill/dist/quill.snow.css"
import React, { useEffect, useRef } from "react"

interface EditorProps {
  text?: string
  setText?: (html: string) => void
}
const Editor = ({ text, setText }: EditorProps = {}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const quillRef = useRef<Quill | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div"),
    )

    const options: QuillOptions = {
      theme: "snow",

      modules: {
        toolbar: [
          [{ header: [5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
      },

      placeholder: "Escreva algo...",
    }

    const quill = new Quill(editorContainer, options)
    quillRef.current = quill
    if (text) {
      quill.clipboard.dangerouslyPasteHTML(text)
    }

    quill.on("text-change", () => {
      if (setText) {
        setText(quill.root.innerHTML)
      }
    })

    return () => {
      if (container) {
        container.innerHTML = ""
      }
    }
  }, [])

  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-slate-50">
      {text}
      <div ref={containerRef} className="ql-custom h-full" />
    </div>
  )
}

export default Editor
