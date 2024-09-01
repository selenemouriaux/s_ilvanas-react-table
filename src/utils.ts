import { orderBy } from "lodash"
import { FONT_FAMILY_MAIN, FONT_SIZE_HEADINGS } from "./constants"
import sortAsc from "./icons/sort-asc.svg"
import sortDesc from "./icons/sort-desc.svg"
import {
  MinHeightProps,
  MinusScrollBarProps,
  MinWidthProps,
  SivTableData,
  SortingIconProps,
  SortingOption,
} from "./types"

export function updateSort(
  sortingOptions: SortingOption[],
  name: string
): SortingOption[] {
  let newOption = true
  sortingOptions.map((obj) => {
    if (obj.name === name) {
      obj.type = obj.type === "asc" ? "desc" : "asc"
      newOption = false
    }
  })
  if (newOption) {
    sortingOptions.push({ name: name, type: "asc" })
    sortingOptions = sortingOptions.slice(-2)
  }
  return sortingOptions
}

export function sortingData(
  data: SivTableData[],
  sortingOptions: SortingOption[]
) {
  sortingOptions = sortingOptions.slice(-2)
  if (data.length)
    return orderBy(
      data,
      sortingOptions.map(({ name }) => name),
      sortingOptions.map(({ type }) => type)
    )
  return data
}

const datePattern = /^\d{4}-\d{1,2}-\d{1,2}$|^\d{1,2}\/\d{1,2}\/\d{4}$/

const isDate = (dateStr: string): boolean => {
  const date = new Date(dateStr)
  return !Number.isNaN(date) && datePattern.test(dateStr)
}

export function makeDatesGreatAgain(data: SivTableData[]) {
  return data.map((item) => {
    const newItem = { ...item }
    Object.keys(newItem).forEach((key) => {
      if (isDate(newItem[key])) {
        newItem[key] = new Date(newItem[key])
      }
    })
    return newItem
  })
}

export function getMinWidth({
  text,
  fontfamily = FONT_FAMILY_MAIN,
  fontSize = FONT_SIZE_HEADINGS,
  padding = 20,
  iconWidth,
}: MinWidthProps): string | undefined {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  if (!context || !text) return undefined
  context.font = `${fontSize}px ${fontfamily}`
  const metrics = context.measureText(text)
  return `${Math.floor(metrics.width + padding + iconWidth)}px`
}

export function getPaginationItemsNbByHeight({
  fontfamily = FONT_FAMILY_MAIN,
  fontSize = FONT_SIZE_HEADINGS,
  padding = 5,
  availableHeight,
  offset = 100,
}: MinHeightProps): number {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  if (!context || !availableHeight) return 30
  context.font = `${fontSize}px ${fontfamily}`
  const metrics = context.measureText("Hello, World!")
  const lineHeight =
    Math.abs(metrics.actualBoundingBoxAscent) +
    Math.abs(metrics.actualBoundingBoxDescent) +
    2 * padding
  return Math.floor((parseInt(availableHeight) - offset) / (lineHeight * 2))
}

export function sortingIcon({ sortingOptions, colName }: SortingIconProps) {
  const option = sortingOptions.find(({ name }) => name === colName)
  if (option) {
    return option.type === "asc" ? sortAsc : sortDesc
  }
  return undefined
}

export function getSizedReducedByScrollBarWidth({
  windowWidth,
  padding = 36,
}: MinusScrollBarProps): string {
  const container = document.createElement("div")
  document.body.appendChild(container)
  container.style.overflow = "scroll"
  container.style.width = "100px"
  container.style.height = "100px"
  const inner = document.createElement("div")
  container.appendChild(inner)
  inner.style.width = "100%"
  inner.style.height = "200px"
  const scrollbarWidth = container.offsetWidth - inner.offsetWidth
  const reducedWidhElement = windowWidth
    ? `${windowWidth - padding - scrollbarWidth}px`
    : "100%"
  document.body.removeChild(container)
  return reducedWidhElement
}

export function getWidth(id: string): string {
  const element = document.getElementById(id) // Sélectionnez l'élément
  const rect = element?.getBoundingClientRect()
  const width = rect?.width
  return width ? `${width}px` : ""
}

export function reOrderRow(row: SivTableData, order: string[]) {
  const orderedRow: Partial<SivTableData> = {}
  order.forEach((key) => {
    orderedRow[key] = row[key]
  })
  return orderedRow
}

export function formatIfDate(
  value: Date | string,
  locale: string,
  options: Intl.DateTimeFormatOptions
) {
  if (!(value instanceof Date)) return value.toString()
  return new Intl.DateTimeFormat(locale, options).format(value)
}
