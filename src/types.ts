/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentPropsWithoutRef } from "react"

export type SivTableData = {
  firstName?: string
  lastName?: string
  startDate?: string
  department?: string
  dateOfBirth?: string
  street?: string
  city?: string
  state?: string
  zipCode?: number | string
  [key: string]: any
}

export type SivTableState = {
  employeesList: SivTableData[]
}

export type Column = {
  title?: string
  name: string
  width?: string
  $priority?: number
  disableSorting?: boolean
} & ComponentPropsWithoutRef<"div">

export type SivTableProps = {
  occupiedHeight: number
  data: SivTableData[]
  columns: Column[] | []
  title?: string
  noSearchBar?: boolean
  style?: any
}

export type SortingOption = {
  name: string
  type: "asc" | "desc"
}

export type MinWidthProps = {
  text?: string
  fontfamily?: string
  fontSize?: number
  padding?: number
  iconWidth: number
}

export type MinHeightProps = {
  availableHeight: string
  offset: number
  fontfamily?: string
  fontSize?: number
  padding?: number
}

export type DataRowProps = {
  dataRow: SivTableData
  colsOrder: string[]
  index: number
  locale?: string
  options?: Intl.DateTimeFormatOptions
  query: string
  theme: any
} & ComponentPropsWithoutRef<"button">

export type itemsPerPageProps = {
  allClosed: number
  withDetails: number
}

export type TableSizeProps = {
  height: string
  width: number
}

export type PartialColumnType = Partial<Column>

export type SortingIconProps = {
  sortingOptions: SortingOption[]
  colName: string
}

export type PaginationControlProps = {
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
  hide: boolean
  theme: any
}

export type MinusScrollBarProps = {
  windowWidth: number
  padding?: number
}

export type SearchBarProps = {
  onSearch: (query: string) => void
  isHidden?: boolean
  query: string
  setQuery: (query: string) => void
  theme: any
}

export type ThemePreset = {
  WrapperProps?: any
  IconProps?: any
  TitleProps?: any
  GuideProps?: any
  SearchFieldProps?: any
  SearchButtonProps?: any
  NavButtonProps?: any
  SubTableProps?: any
  TableProps?: any
  ColumnTitleProps?: any
  CellProps?: any
  ButtonProps?: any
}

export type ThemePresets = {
  [key: string]: ThemePreset
}

export type CssColumnTitleProps = {
  $type: string
  $isMainCriterion?: boolean
  $isSecondCriterion?: boolean
  width?: string
  $mainCriterionColor?: string
  $secondCriterionColor?: string
} & ComponentPropsWithoutRef<"div">

export type CssButton = {
  $type: string
} & ComponentPropsWithoutRef<"button">

export type CssCellProps = {
  $type: string
  width?: string
} & ComponentPropsWithoutRef<"button">

export type CssWrapperProps = {
  $type: string
  $mainColor?: string
  $secondaryColor?: string
} & ComponentPropsWithoutRef<"div">

export type CssIconProps = {
  $type: string
  $visibleOnHover?: boolean
} & ComponentPropsWithoutRef<"img">

export type CssTitleProps = {
  $type: string
} & ComponentPropsWithoutRef<"div">

export type CssGuideProps = {
  $type: string
} & ComponentPropsWithoutRef<"div">

export type CssSearchFieldProps = {
  $type: string
} & ComponentPropsWithoutRef<"input">

export type CssSubTableProps = {
  $type: string
  width?: string
} & ComponentPropsWithoutRef<"table">

export type CssTableProps = {
  $type: string
  height: string
  $linesBaseColor?: string
} & ComponentPropsWithoutRef<"div">

export type CssSpanProps = {
  $type: string
} & ComponentPropsWithoutRef<"span">
