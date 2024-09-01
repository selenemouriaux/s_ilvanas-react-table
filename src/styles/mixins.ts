import { css } from "styled-components"

export const centeredXYtext = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const applyThemeStyles = (theme: any, element: string) => css`
  ${theme[element]?.backgroundColor &&
  `background-color: ${theme[element].backgroundColor};`}
  ${theme[element]?.$mainColor &&
  `background-color: ${theme[element].$mainColor};`}
  ${theme[element]?.$secondaryColor &&
  `color: ${theme[element].$secondaryColor};`}
  ${theme[element]?.color && `color: ${theme[element].color};`}
  ${theme[element]?.width && `width: ${theme[element].width};`}
  ${theme[element]?.height && `height: ${theme[element].height};`}
  ${theme[element]?.borderRadius &&
  `border-radius: ${theme[element].borderRadius};`}
  ${theme[element]?.fontWeight && `font-weight: ${theme[element].fontWeight};`}
  ${theme[element]?.fontSize && `font-size: ${theme[element].fontSize};`}
  ${theme[element]?.textAlign && `text-align: ${theme[element].textAlign};`}
  ${theme[element]?.minWidth && `min-width: ${theme[element].minWidth};`}
  ${theme[element]?.display && `display: ${theme[element].display};`}
  ${theme[element]?.flexDirection &&
  `flex-direction: ${theme[element].flexDirection};`}
  ${theme[element]?.justifyContent &&
  `justify-content: ${theme[element].justifyContent};`}
  ${theme[element]?.alignItems && `align-items: ${theme[element].alignItems};`}
  ${theme[element]?.gap && `gap: ${theme[element].gap};`}
  ${theme[element]?.padding && `padding: ${theme[element].padding};`}
  ${theme[element]?.margin && `margin: ${theme[element].margin};`}
  ${theme[element]?.boxSzing && `box-sizing: ${theme[element].boxSzing};`}
  ${theme[element]?.fontFamily && `font-family: ${theme[element].fontFamily};`}
  ${theme[element]?.position && `position: ${theme[element].position};`}
  ${theme[element]?.flexWrap && `flex-wrap: ${theme[element].flexWrap};`}
  ${theme[element]?.boxShadow && `box-shadow: ${theme[element].boxShadow};`}
  ${theme[element]?.overflowY && `overflow-y: ${theme[element].overflowY};`}
  ${theme[element]?.tableLayout &&
  `table-layout: ${theme[element].tableLayout};`}
  ${theme[element]?.borderCollapse &&
  `border-collapse: ${theme[element].borderCollapse};`}
  ${theme[element]?.border && `border: ${theme[element].border};`}
  ${theme[element]?.borderTop && `border-top: ${theme[element].borderTop};`}
  ${theme[element]?.borderBottom &&
  `border-bottom: ${theme[element].borderBottom};`}
  ${theme[element]?.borderRight &&
  `border-right: ${theme[element].borderRight};`}
  ${theme[element]?.borderLeft && `border-left: ${theme[element].borderLeft};`}
  ${theme[element]?.visibility && `visibility: ${theme[element].visibility};`}
  ${theme[element]?.top && `top: ${theme[element].top};`}
  ${theme[element]?.bottom && `bottom: ${theme[element].bottom};`}
  ${theme[element]?.left && `left: ${theme[element].left};`}
  ${theme[element]?.right && `right: ${theme[element].right};`}
  ${theme[element]?.whiteSpace && `white-space: ${theme[element].whiteSpace};`}
  ${theme[element]?.textShadow && `text-shadow: ${theme[element].textShadow};`}
  ${theme[element]?.thead && `thead {${theme[element].thead}}`}
  
  ${theme[element]?.[" .right"] && `& .right {${theme[element][" .right"]}}`}
  ${theme[element]?.[" .left"] && `& .left {${theme[element][" .left"]}}`}
  ${theme[element]?.[" .active"] && `& .active {${theme[element][" .active"]}}`}
  ${theme[element]?.[" .inactive"] &&
  `& .inactive {${theme[element][" .inactive"]}}`}
  ${theme[element]?.[" .big"] && `& .big {${theme[element][" .big"]}}`}
  ${theme[element]?.[" .ellipsis"] &&
  `& .ellipsis {${theme[element][" .ellipsis"]}}`}
  ${theme[element]?.[" .bodyContainer"] &&
  `& .bodyContainer {${theme[element][" .bodyContainer"]}}`}
  ${theme[element]?.[".sizer"] && `&.sizer {${theme[element][".sizer"]}}`}
  ${theme[element]?.[".noBorder"] &&
  `&.noBorder {${theme[element][".noBorder"]}}`}
  ${theme[element]?.[".noBackground"] &&
  `&.noBackground {${theme[element][".noBackground"]}}`}
`
