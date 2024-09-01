import styled from "styled-components"
import { PALETTE } from "../constants"
import {
  CssButton,
  CssCellProps,
  CssColumnTitleProps,
  CssGuideProps,
  CssIconProps,
  CssSearchFieldProps,
  CssSpanProps,
  CssSubTableProps,
  CssTableProps,
  CssTitleProps,
  CssWrapperProps,
} from "../types"
import { applyThemeStyles, centeredXYtext } from "./mixins"

export const Icon = styled.img.attrs<CssIconProps>((props) => ({
  ...props,
}))<CssIconProps>`
  width: 20px;
  height: 20px;
  opacity: ${(props) => (props.$visibleOnHover ? 0 : 1)};
  ${(props) => props.theme && applyThemeStyles(props.theme, props.$type)}
`

export const Title = styled.div.attrs<CssTitleProps>((props) => ({
  ...props,
}))<CssTitleProps>`
  background-color: ${PALETTE.LIGHTER};
  border-radius: 10px;
  width: 100%;
  font-weight: bold;
  font-size: large;
  text-align: center;
  ${(props) => props.theme && applyThemeStyles(props.theme, props.$type)}
`

export const Guide = styled.div.attrs<CssGuideProps>((props) => ({
  ...props,
}))<CssTitleProps>`
  min-width: 100px;
  background-color: ${PALETTE.DARK};
  border-radius: 10px;
  font-weight: normal;
  font-size: 1rem;
  ${centeredXYtext};
  padding: 10px;
  & .right {
    margin-left: auto;
  }
  & .left {
    margin-right: auto;
  }
  ${(props) => props.theme && applyThemeStyles(props.theme, props.$type)}
`

export const SearchField = styled.input.attrs<CssSearchFieldProps>((props) => ({
  ...props,
}))<CssSearchFieldProps>`
  height: 30px;
  padding: 0 10px;
  font-size: inherit;
  color: ${PALETTE.DARKER};
  font-weight: bold;
  ${(props) => props.theme && applyThemeStyles(props.theme, props.$type)}
`

export const SearchButton = styled.button.attrs<CssButton>((props) => ({
  ...props,
}))<CssButton>`
  height: 34px;
  display: block;
  ${(props) => props.theme && applyThemeStyles(props.theme, props.$type)}
`
export const NavButton = styled.button.attrs<CssButton>((props) => ({
  ...props,
}))<CssButton>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => props.theme && applyThemeStyles(props.theme, props.$type)}
`

export const Wrapper = styled.div.attrs<CssWrapperProps>((props) => ({
  ...props,
}))<CssWrapperProps>`
  box-sizing: border-box;
  font-family: inherit;
  color: inherit;
  position: relative;
  height: auto;

  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  background-color: ${PALETTE.LIGHTER};
  border-radius: 10px;
  margin: 0;
  padding: 10px;
  border-radius: 20px;

  & .active {
    background-color: ${PALETTE.PRIMARY};
    color: ${PALETTE.WHITE};
  }
  & .inactive {
    background-color: ${PALETTE.LIGHT};
    color: ${PALETTE.BLACK};
  }
  & .big {
    border-radius: 5px;
    padding: 10px;
    border: 2px solid ${PALETTE.WHITE};
    border-radius: 10px;
    font-size: bolder;
  }
  & .ellipsis {
    color: ${PALETTE.LIGHTER};
    font-weight: bolder;
  }
  ${(props) => props.theme && applyThemeStyles(props.theme, props.$type)}
`

export const SubTable = styled.table.attrs<CssSubTableProps>((props) => ({
  ...props,
}))<CssSubTableProps>`
  table-layout: auto;
  border-collapse: collapse;
  width: ${(props) => props.width};
  ${(props) => props.theme && applyThemeStyles(props.theme, props.$type)}
`

export const Table = styled.div.attrs<CssTableProps>((props) => ({
  ...props,
}))<CssTableProps>`
  height: auto;
  width: 100%;
  margin: 10px 0;
  & .bodyContainer {
    height: ${(props) => props.height || "30vh"};
    overflow-y: auto;
  }
  ${SubTable}
  thead {
    z-index: 1;
    border-top: 1px solid black;
    border-bottom: 2px solid black;
    background-color: ${PALETTE.PRIMARY};
    text-shadow: 2px 2px 6px ${PALETTE.LIGHTER}, 0px 0px 5px ${PALETTE.WHITE};
    font-size: 1.1rem;
    & > tr > {
      &:not(:first-child) {
        border-left: 1px solid black;
      }
    }
    &.sizer {
      visibility: collapse;
      border: none;
    }
  }
  tr {
    &:nth-child(odd) {
      background-color: darken(
        ${(props) =>
          props.theme[props.$type]?.$linesBaseColor ?? PALETTE.LIGHT},
        10%
      );
    }
    &:nth-child(even) {
      background-color: ${(props) =>
        props.theme[props.$type]?.$linesBaseColor ?? PALETTE.LIGHT};
    }
    &:hover {
      & img {
        opacity: 1;
      }
    }
  }
  tbody {
    position: relative;
    top: 20px;
  }
  ${(props) => props.theme && applyThemeStyles(props.theme, props.$type)}
`

export const ColumnTitle = styled.th.attrs<CssColumnTitleProps>((props) => ({
  ...props,
}))<CssColumnTitleProps>`
  width: ${(props) => props.width};
  cursor: pointer;
  padding: 20px 10px;
  white-space: nowrap;
  background-color: ${(props) =>
    props.$isMainCriterion
      ? props.theme[props.$type]?.$mainCriterionColor ?? PALETTE.LIGHT
      : props.$isSecondCriterion
      ? props.theme[props.$type]?.$secondCriterionColor ?? PALETTE.LIGHTER
      : "unset"};
  & > img {
    margin: auto;
    padding: 0 10px;
  }
  ${(props) => props.theme && applyThemeStyles(props.theme, props.$type)}
`

export const Cell = styled.td.attrs<CssCellProps>((props) => ({
  ...props,
}))<CssCellProps>`
  padding: 5px 0 5px 20px;
  height: 2rem;
  max-height: 2rem;
  ${(props) => props.theme && applyThemeStyles(props.theme, props.$type)}
`

export const Button = styled.button.attrs<CssButton>((props) => ({
  ...props,
}))<CssButton>`
  &.noBorder {
    border: none;
  }
  &.noBackground {
    background-color: transparent;
  }
  ${(props) => props.theme && applyThemeStyles(props.theme, props.$type)}
`
export const Span = styled.span.attrs<CssSpanProps>((props) => ({
  ...props,
}))<CssSpanProps>`
  color: ${PALETTE.LIGHTER};
  background-color: ${PALETTE.DARKER};
  ${(props) => props.theme && applyThemeStyles(props.theme, props.$type)}
`
