"use client"

import Quill from "quill"
import "quill/dist/quill.snow.css"
import React, { useEffect, useRef } from "react"

interface EditorProps {
  text?: string
  setText?: (html: string) => void
}

const Editor = ({ text = "", setText }: EditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<Quill | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const quill = new Quill(containerRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
      },
      placeholder: "Escreva algo...",
    })

    quillRef.current = quill

    // Define o conteúdo inicial do editor
    if (text) {
      quill.clipboard.dangerouslyPasteHTML(text)
    }

    quill.on("text-change", () => {
      if (setText) {
        setText(quill.root.innerHTML)
      }
    })

    return () => {
      quillRef.current = null
    }
  }, [text, setText])

  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-slate-50">
      <div ref={containerRef} className="ql-custom h-full" />
    </div>
  )
}

export default Editor
