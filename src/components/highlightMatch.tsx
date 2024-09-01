import { Span } from "../styles/styles"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const highlightMatch = (value: string, query: string, theme: any) => {
  const text = typeof value === "string" ? value : String(value)

  if (!query) return text

  const normalizedText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const normalizedQuery = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const escapedQuery = normalizedQuery.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
  const parts = normalizedText.split(new RegExp(`(${escapedQuery})`, "gi"))

  if (parts.length === 1) return text

  return (
    <>
      {parts.map((part, index) => {
        const originalPart = text.slice(
          normalizedText.indexOf(part),
          normalizedText.indexOf(part) + part.length
        )
        return part.toLowerCase() === normalizedQuery.toLowerCase() ? (
          <Span $type="SpanProps" theme={theme} key={index}>
            {originalPart}
          </Span>
        ) : (
          originalPart
        )
      })}
    </>
  )
}
