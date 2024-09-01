import { ReactNode } from "react"
import { Cell } from "../styles/styles"
import { DataRowProps } from "../types"
import { formatIfDate } from "../utils"
import { highlightMatch } from "./highlightMatch"

const RenderHiddenRow = ({
  dataRow,
  index,
  colsOrder,
  locale = "fr-FR",
  options = {
    // weekday: "long",
    // year: "numeric",
    // month: "long",
    // day: "numeric",
  },
  query,
  theme,
  ...props
}: DataRowProps): ReactNode => {
  return (
    <tr key={`extraLine-${index}`}>
      <Cell
        colSpan={colsOrder.length}
        key={`extraDetails-${index}`}
        theme={theme}
        $type="CellProps"
        {...props}
      >
        {Object.values(dataRow).map((item, idx) => {
          const highlightedText = highlightMatch(
            formatIfDate(item.value, locale, options).toString(),
            query,
            theme
          )
          return (
            <p key={idx}>
              {`${item.title} : `}
              {Array.isArray(highlightedText) ? (
                <>
                  {highlightedText.map((part, subIndex) => (
                    <span key={subIndex}>{part}</span>
                  ))}
                </>
              ) : (
                highlightedText
              )}
            </p>
          )
        })}
      </Cell>
    </tr>
  )
}

export default RenderHiddenRow
