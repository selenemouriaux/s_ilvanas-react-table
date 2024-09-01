import { BLACKNWHITE, HRNET } from "../constants"
import { ThemePresets } from "../types"

const presetsList = [
  {
    name: "blackNwhite",
    ButtonProps: {
      ".noBorder": "",
      ".noBackground": "",
    },
    CellProps: {},
    ColumnTitleProps: {
      width: "",
      $mainCriterionColor: BLACKNWHITE.LIGHT,
      $secondCriterionColor: BLACKNWHITE.GREY,
    },
    GuideProps: {
      backgroundColor: BLACKNWHITE.DARK,
      " .right": "",
      " .left": "",
    },
    IconProps: {},
    NavButtonProps: {
      ".active": "",
    },
    SearchButtonProps: {},
    SearchFieldProps: {
      color: BLACKNWHITE.DARK,
    },
    SpanProps: {
      backgroundColor: `${BLACKNWHITE.LIGHT} !important`,
      color: BLACKNWHITE.DARK,
    },
    SubTableProps: {
      width: "",
    },
    TableProps: {
      $linesBaseColor: BLACKNWHITE.DARK,
      ".bodyContainer": "",
      thead: `
      background-color: ${BLACKNWHITE.LIGHTER} !important; 
      color: ${BLACKNWHITE.DARKER};
      text-shadow: none !important;
      th:first-child {
        border-top-left-radius: 10px; /* Ajuste la valeur selon tes besoins */
        border-bottom-left-radius: 10px;
      }
      th:last-child {
        border-top-right-radius: 10px; /* Ajuste la valeur selon tes besoins */
        border-bottom-right-radius: 10px;
      }
    `,
    },
    TitleProps: {},
    WrapperProps: {
      $mainColor: BLACKNWHITE.DARKER,
      $secondaryColor: BLACKNWHITE.LIGHTER,
      width: "",
      " .active": `
      background-color: ${BLACKNWHITE.DARKER};
      color: ${BLACKNWHITE.LIGHTER};
      `,
      " .inactive": `
      background-color: ${BLACKNWHITE.LIGHT};
      color: ${BLACKNWHITE.DARK};
      `,
      ".big": "",
      ".ellipsis": "",
    },
  },
  {
    name: "hrnet",
    ButtonProps: {
      ".noBorder": ``,
      ".noBackground": ``,
    },
    CellProps: {},
    ColumnTitleProps: {
      width: ``,
      $mainCriterionColor: HRNET.GREEN_REGULAR,
      $secondCriterionColor: HRNET.GREEN_LIGHT,
    },
    GuideProps: {
      backgroundColor: HRNET.GREEN_REGULAR,
      ".right": ``,
      ".left": ``,
    },
    IconProps: {},
    NavButtonProps: {
      ".active": ``,
    },
    SearchButtonProps: {},
    SearchFieldProps: {
      color: HRNET.CONTRAST_DARK,
    },
    SpanProps: {
      backgroundColor: `${HRNET.CONTRAST_DARK} !important`,
      color: HRNET.BACKGROUND_LIGHT,
    },
    SubTableProps: {
      width: ``,
    },
    TableProps: {
      $linesBaseColor: HRNET.GREEN_LIGHT,
      ".bodyContainer": ``,
      thead: `
      background-color: ${HRNET.GREEN_DARK} !important; 
      color: ${HRNET.BACKGROUND_LIGHT};
      text-shadow: none !important;
    `,
    },
    TitleProps: {},
    WrapperProps: {
      $mainColor: HRNET.BACKGROUND_LIGHT,
      $secondaryColor: ``,
      width: ``,
      " .active": `
      background-color: ${HRNET.GREEN_DARK};
      color: ${HRNET.BACKGROUND_LIGHT};
      `,
      " .inactive": `
      background-color: ${HRNET.BACKGROUND_LIGHT};
      color: ${HRNET.GREEN_TEXT};
      `,
      " .big": ``,
      " .ellipsis": ``,
    },
  },
]

export const presets: ThemePresets = presetsList.reduce(
  (prevTheme, currentTheme) => {
    const { name, ...theme } = currentTheme
    return {
      ...prevTheme,
      [name]: theme,
    }
  },
  {}
)
