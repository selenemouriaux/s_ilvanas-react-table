import prevIcon from "../icons/caret-left.svg"
import nextIcon from "../icons/caret-right.svg"
import toFirstIcon from "../icons/toFirst.svg"
import toLastIcon from "../icons/toLast.svg"
import { Guide, Icon, NavButton } from "../styles/styles"
import { PaginationControlProps } from "../types"

const PaginationControls = ({
  currentPage,
  totalPages,
  setCurrentPage,
  hide,
  theme,
}: PaginationControlProps) => {
  if (hide) return null

  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5
    let startPage = Math.max(currentPage - 2, 1)
    let endPage = Math.min(currentPage + 2, totalPages)
    if (currentPage - 2 <= 0) {
      endPage = Math.min(maxPagesToShow, totalPages)
    }
    if (currentPage + 2 > totalPages) {
      startPage = Math.max(totalPages - maxPagesToShow + 1, 1)
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  const pageNumbers = getPageNumbers()
  const showLeftEllipsis = pageNumbers[0] > 1
  const showRightEllipsis = pageNumbers[pageNumbers.length - 1] < totalPages

  return (
    <Guide $type="GuideProps" theme={theme} className="right">
      <NavButton
        $type="NavButtonProps"
        theme={theme}
        onClick={() => setCurrentPage(1)}
        disabled={currentPage <= 1}
      >
        <Icon
          $type="IconProps"
          alt="back to first page icon"
          theme={theme}
          src={toFirstIcon}
        />
      </NavButton>
      <NavButton
        $type="NavButtonProps"
        theme={theme}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <Icon
          $type="IconProps"
          alt="previous page icon"
          theme={theme}
          src={prevIcon}
        />
      </NavButton>
      {showLeftEllipsis && <span className="ellipsis">...</span>}
      {pageNumbers.map((pageNumber) => (
        <NavButton
          $type="NavButtonProps"
          theme={theme}
          key={pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
          className={currentPage === pageNumber ? "active big" : undefined}
        >
          {pageNumber}
        </NavButton>
      ))}
      {showRightEllipsis && <span className="ellipsis">...</span>}
      <NavButton
        $type="NavButtonProps"
        theme={theme}
        onClick={() =>
          setCurrentPage(currentPage >= totalPages ? 1 : currentPage + 1)
        }
        disabled={currentPage >= totalPages}
      >
        <Icon
          $type="IconProps"
          alt="next page icon"
          theme={theme}
          src={nextIcon}
        />
      </NavButton>
      <NavButton
        $type="NavButtonProps"
        theme={theme}
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage >= totalPages}
      >
        <Icon
          $type="IconProps"
          alt="straight to last page icon"
          theme={theme}
          src={toLastIcon}
        />
      </NavButton>
    </Guide>
  )
}

export default PaginationControls
