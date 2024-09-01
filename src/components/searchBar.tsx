import { ChangeEvent, KeyboardEvent, useState } from "react"
import searchIcon from "../icons/search.svg"
import deleteIcon from "../icons/trash.svg"
import { Guide, Icon, SearchButton, SearchField } from "../styles/styles"
import { SearchBarProps } from "../types"

const SearchBar = ({
  onSearch,
  isHidden = false,
  query,
  setQuery,
  theme,
}: SearchBarProps) => {
  const [toggleIcon, setToggleIcon] = useState<boolean>(true)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    setToggleIcon(true)
  }
  const handleSearch = () => {
    setToggleIcon(!toggleIcon)
    onSearch(query)
  }
  const ditchFilter = () => {
    setQuery("")
    onSearch("")
    setToggleIcon(!toggleIcon)
  }
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch()
    }
  }

  return (
    !isHidden && (
      <Guide $type="GuideProps" theme={theme} className="right">
        <SearchField
          $type="SearchFieldProps"
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Search..."
          theme={theme}
        />
        {toggleIcon ? (
          <SearchButton
            $type="SearchButtonProps"
            theme={theme}
            onClick={handleSearch}
          >
            <Icon $type="IconProps" theme={theme} src={searchIcon} />
          </SearchButton>
        ) : (
          <SearchButton
            $type="SearchButtonProps"
            theme={theme}
            onClick={ditchFilter}
          >
            <Icon $type="IconProps" theme={theme} src={deleteIcon} />
          </SearchButton>
        )}
      </Guide>
    )
  )
}

export default SearchBar
