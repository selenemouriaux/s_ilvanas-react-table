import React from "react"
import { Cell } from "../styles/styles"
import { DataRowProps } from "../types"
import { formatIfDate } from "../utils"
import { highlightMatch } from "./highlightMatch"

const RenderDataRow = ({
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
}: DataRowProps) => (
  <tr key={`line-${index}`}>
    {Object.values(dataRow).map((value, idx) => (
      <Cell
        key={`${colsOrder[idx]}-${index}`}
        theme={theme}
        $type="CellProps"
        {...props}
      >
        {typeof value === "object" &&
        value !== null &&
        React.isValidElement(value)
          ? value
          : highlightMatch(formatIfDate(value, locale, options), query, theme)}
      </Cell>
    ))}
  </tr>
)

export default RenderDataRow
