/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from "react"
import PaginationControls from "./components/paginationNav.tsx"
import RenderDataRow from "./components/RenderDataRow.tsx"
import RenderHiddenRow from "./components/RenderHiddenRow.tsx"
import SearchBar from "./components/searchBar.tsx"
import { ICON_WIDTH } from "./constants.ts"
import resetIcon from "./icons/reset.svg"
import moreIcon from "./icons/see-more.svg"
import sortIcon from "./icons/sort-button.svg"
import {
  Button,
  ColumnTitle,
  Guide,
  Icon,
  SubTable,
  Table,
  Title,
  Wrapper,
} from "./styles/styles.ts"
import { presets } from "./styles/styling-presets.ts"
import { Column, SortingOption, TableSizeProps } from "./types.ts"
import {
  getMinWidth,
  getPaginationItemsNbByHeight,
  getSizedReducedByScrollBarWidth,
  makeDatesGreatAgain,
  sortingData,
  sortingIcon,
  updateSort,
} from "./utils.ts"

export type SivTableProps<SivTableData> = {
  occupiedHeight: number
  data: SivTableData[]
  columns: Column[] | []
  title?: string
  noSearchBar?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any
}

/**
 * This component turns an array of data into an actual table. Customizable and responsive.
 * @component
 * @param occupiedHeight defines the height of the window that is reserved for the app, allows to keep the table within the viewport with no scroll, preferably dynamic, numeric value.
 * @param data is the array of objects to be displayed in the table.
 * @param columns identifies each data by column to return either raw if no render method specified or processed if the object includes a render method, it accepts a 'title', a 'name' which should match the field, a 'width' if you want it fixed, and a $priority which, when defined from 1 up, will remain visible when the global width is reduced.
 * @param title give the table a title.
 * @param noSearchBar boolean which deactivates the search bar.
 * @param style standard themes can be selected from presets, hrnet or blackNwhite, custom partial override cans be provided following examples in documentatione. it overrides the default theme.
 * @returns a table of the passed data following standard lib output or options passed
 */
const SivTable = <SivTableData extends object>({
  occupiedHeight,
  data,
  columns = [],
  title,
  noSearchBar = false,
  style,
}: SivTableProps<SivTableData>) => {
  const [newData, setNewData] = useState<SivTableData[]>(
    makeDatesGreatAgain(data)
  )
  const [sortingOptions, setSortingOptions] = useState<SortingOption[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [infiniteScroll, setInfiniteScroll] = useState(false)
  const [query, setQuery] = useState<string>("")
  const [detailedRow, setDetailedRow] = useState<number | null>(null)
  const [hiddenIndexes, setHiddenIndexes] = useState<number[]>([])
  const [tableSize, setTableSize] = useState<TableSizeProps>({
    height: `${window.innerHeight - occupiedHeight}px`,
    width: window.innerWidth,
  })

  const theme = useMemo(
    () => (typeof style === "string" ? presets[style] : style ?? null),
    [style]
  )

  const computedColumns = useMemo(
    () =>
      columns.map(({ title, disableSorting, width, ...props }) => {
        const calculatedWidth =
          width ||
          getMinWidth({
            text: title,
            iconWidth: disableSorting ? 0 : ICON_WIDTH,
          })
        return { ...props, title, disableSorting, width: calculatedWidth }
      }),
    [tableSize.width]
  )

  const collapsingOrder = useMemo(
    () =>
      computedColumns
        ? computedColumns
            .filter((col) => col.$priority !== 1)
            .sort((a, b) => (b.$priority ?? 0) - (a.$priority ?? 0))
            .map((col) => ({
              name: col.name,
              width: col.width,
              disableSorting: col.disableSorting,
            }))
            .reverse()
        : [],
    [computedColumns]
  )

  const colNamesToCollapse = useMemo(() => {
    if (collapsingOrder && collapsingOrder.length > 0) {
      const widths = collapsingOrder.reduce<number[]>(
        (acc, { width, disableSorting }) => {
          const lastLength =
            acc.length > 0
              ? acc[acc.length - 1]
              : 50 + parseInt(computedColumns[0].width ?? "0")
          const newLength =
            lastLength +
            parseInt(width ?? "0") +
            (disableSorting ? 0 : ICON_WIDTH)
          return [...acc, newLength]
        },
        []
      )
      return widths
        .map((value, index) => ({
          name: collapsingOrder[widths.length - (index + 1)].name,
          breakpoint: value,
        }))
        .reverse()
        .filter((item) => item.breakpoint > window.innerWidth)
        .map((item) => item.name)
        .filter((name): name is string => name !== undefined)
    } else {
      return []
    }
  }, [collapsingOrder])

  const nbLines = useMemo(
    () => ({
      allClosed: getPaginationItemsNbByHeight({
        availableHeight: tableSize.height ?? "100px",
        offset: 0,
      }),
      withDetails: detailedRow ? colNamesToCollapse?.length : 0,
    }),
    [tableSize.height, detailedRow]
  )

  const updatedCols = useMemo(() => {
    if (colNamesToCollapse.length === 0) return null
    return computedColumns.filter(
      (col) => !colNamesToCollapse.includes(col.name)
    )
  }, [colNamesToCollapse, tableSize.width])

  const toggleDetails = useCallback(
    (index: number) => {
      if (colNamesToCollapse.length > 0) {
        if (colNamesToCollapse.length > 0) {
          setDetailedRow((prevDetailedRow) =>
            prevDetailedRow === index ? null : index
          )
        }
      }
    },
    [colNamesToCollapse.length]
  )

  useEffect(() => {
    if (detailedRow === null) setHiddenIndexes([])
    else {
      setHiddenIndexes(
        Array.from({ length: nbLines.withDetails }, (_, i) => {
          return (detailedRow + 1 + i) % nbLines.allClosed
        })
      )
    }
  }, [detailedRow, nbLines.withDetails, nbLines.allClosed])

  const onClickSort = (name: string, sort: SortingOption[]) => {
    setSortingOptions(updateSort(sort, name))
    setCurrentPage(1)
    const sortedData = sortingData(newData, sort)
    setNewData(makeDatesGreatAgain(sortedData))
  }
  const resetSorting = () => {
    setSortingOptions([])
    setCurrentPage(1)
    setNewData(makeDatesGreatAgain(data))
  }

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setTableSize({
          height: `${window.innerHeight - occupiedHeight}px`,
          width: window.innerWidth,
        })
      }, 50)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const startIndex = (currentPage - 1) * nbLines.allClosed
  const endIndex =
    startIndex + nbLines.allClosed <= newData.length
      ? startIndex + nbLines.allClosed
      : newData.length - (currentPage - 1) * nbLines.allClosed + startIndex
  const currentItems = newData.slice(startIndex, endIndex)
  const totalPages = Math.ceil(newData.length / nbLines.allClosed)

  const tableHeading = useMemo(
    () =>
      (updatedCols || computedColumns)
        .map(({ title, name, disableSorting, width, ...props }) => (
          <ColumnTitle
            $type="ColumnTitleProps"
            id={`header-${name}`}
            key={`header-${name}`}
            width={width}
            onClick={() =>
              !disableSorting && onClickSort(name ?? "", sortingOptions)
            }
            $isMainCriterion={sortingOptions[0]?.name === name}
            $isSecondCriterion={sortingOptions[1]?.name === name}
            theme={theme}
            {...props}
          >
            {title || name}
            {!disableSorting && (
              <Icon
                src={
                  sortingIcon({ sortingOptions, colName: name ?? "" }) ??
                  sortIcon
                }
                alt="sorting icon"
                $type="IconProps"
                theme={theme}
              />
            )}
          </ColumnTitle>
        ))
        .concat(
          <ColumnTitle
            $type="ColumnTitleProps"
            onClick={() => resetSorting()}
            key="expandIconsColumn"
            width="50px"
            theme={theme}
          >
            <Icon
              $type="IconProps"
              alt="reset sorting icon"
              src={resetIcon}
              theme={theme}
            />
          </ColumnTitle>
        ),
    [updatedCols, computedColumns, onClickSort, resetSorting]
  )

  const headersWidthReport = useMemo(
    () =>
      (updatedCols || computedColumns)
        .map(({ width, name }) => (
          <ColumnTitle
            $type="ColumnTitleProps"
            theme={theme}
            key={`reported-header-${name}`}
            width={width}
          >
            sizing..
          </ColumnTitle>
        ))
        .concat(
          <ColumnTitle
            $type="ColumnTitleProps"
            key={"reported-header-extra-row"}
            width={"50px"}
            theme={theme}
          >
            sizing..
          </ColumnTitle>
        ),
    [updatedCols, computedColumns]
  )

  const colsOrder = Object.keys(data[0]).map((key) => key)
  const tableContent = useMemo(
    () =>
      (infiniteScroll ? newData : currentItems).map((rowData, index) => {
        const filteredRowData = Object.fromEntries(
          Object.entries(rowData).filter(([key]) =>
            (updatedCols || computedColumns)
              .map((col) => col.name)
              .includes(key)
          )
        )
        const hiddenExtraData =
          updatedCols &&
          Object.fromEntries(
            Object.entries(rowData)
              .filter(
                ([key]) => !updatedCols.map((col) => col.name).includes(key)
              )
              .map(([key, value]) => {
                const column = columns.find((col) => col.name === key)
                return [key, { value, title: column ? column.title : null }]
              })
          )
        const btn =
          updatedCols || (!updatedCols && colNamesToCollapse.length === 0)
            ? {
                btn: (
                  <Button
                    $type="ButtonProps"
                    className="noBorder noBackground"
                    theme={theme}
                  >
                    {" "}
                    {colNamesToCollapse.length !== 0 && (
                      <Icon
                        $type="IconProps"
                        $visibleOnHover
                        src={moreIcon}
                        alt="show hidden details icon"
                        theme={theme}
                      />
                    )}
                  </Button>
                ),
              }
            : {}
        const shouldRenderRow =
          hiddenIndexes.length > 0 ? !hiddenIndexes.includes(index) : true

        return (
          <React.Fragment key={`row-wrapper-${index}`}>
            {(infiniteScroll || shouldRenderRow) && (
              <RenderDataRow
                dataRow={{ ...filteredRowData, ...btn }}
                index={index}
                colsOrder={colsOrder}
                query={query}
                onClick={() => toggleDetails(index)}
                theme={theme}
              />
            )}
            {detailedRow === index && (
              <RenderHiddenRow
                dataRow={{ ...hiddenExtraData }}
                index={index}
                colsOrder={colsOrder}
                query={query}
                onClick={() => toggleDetails(index)}
                theme={theme}
              />
            )}
          </React.Fragment>
        )
      }),
    [
      infiniteScroll,
      newData,
      currentItems,
      updatedCols,
      computedColumns,
      hiddenIndexes,
      colNamesToCollapse,
      toggleDetails,
      query,
      detailedRow,
    ]
  )

  const handleSearch = (query: string) => {
    const matchs = data.filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase())
      )
    })
    setSortingOptions([])
    setCurrentPage(1)
    setNewData(makeDatesGreatAgain(matchs))
  }

  return (
    <Wrapper $type="WrapperProps" theme={theme}>
      {title && (
        <Title $type="TitleProps" theme={theme}>
          {title}
        </Title>
      )}
      <SearchBar
        isHidden={noSearchBar}
        onSearch={handleSearch}
        query={query}
        setQuery={setQuery}
        theme={theme}
      />
      <Guide $type="GuideProps" theme={theme} className="left">
        <Button
          $type="ButtonProps"
          theme={theme}
          className={infiniteScroll ? "active" : "inactive"}
          onClick={() => setInfiniteScroll(!infiniteScroll)}
        >
          Switch to {infiniteScroll ? "Pagination" : "full list"}
        </Button>
      </Guide>
      <Table $type="TableProps" theme={theme} height={tableSize.height}>
        <SubTable
          $type="SubTableProps"
          theme={theme}
          id="titleTable"
          width={
            infiniteScroll
              ? getSizedReducedByScrollBarWidth({
                  windowWidth: tableSize.width,
                })
              : "100%"
          }
        >
          <thead>
            <tr>{tableHeading}</tr>
          </thead>
        </SubTable>
        <div className="bodyContainer">
          <SubTable $type="SubTableProps" theme={theme} width="100%">
            <thead className="sizer">
              <tr key={"reporting header"}>{headersWidthReport}</tr>
            </thead>
            <tbody>{tableContent}</tbody>
          </SubTable>
        </div>
      </Table>
      <PaginationControls
        hide={infiniteScroll}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        theme={theme}
      />
      {!infiniteScroll && totalPages > 1 && (
        <Guide $type="GuideProps" theme={theme} className="left">
          Entries {startIndex + 1} to {endIndex} over {totalPages} pages
        </Guide>
      )}
    </Wrapper>
  )
}

export default SivTable
