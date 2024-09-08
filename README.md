# React component for tables : SivTable

![Glimpse of SivTable](/public/Animation.gif)

## Description

This package aims to display tables in your React projects, especially for renders within the viewport.

Among other things, it will auto resize itself and adjust its content in the viewport for readability and confort of use purposes, considering the space you give to it. At the moment, it estimates its own height based on the VH minus the height you keep dedicated to everything else on your screen, therefore you will need to think its integration into your page/component.

This is a first version, please provide feedback for udpates/fixes if you are interested in the idea.

Mobile display will come later.

## Installation

To install the package via npm :

```bash
npm install siv-table
```

## Use example

```js
const EmployeesList = () => {
  return (
    <SivTable
      title="TITRE !"
      noSearchBar
      style="blackNwhite"
      occupiedHeight={500}
      data={employeesList}
      columns={[
        { title: "First Name", name: "firstName", width: "120px" },
        { title: "Last Name", name: "lastName", width: "150px", $priority: 1 },
        { title: "Start Date", name: "startDate" },
        { title: "Department", name: "department", $priority: 2 },
        { title: "Date of Birth", name: "dateOfBirth" },
        {
          title: "Street",
          name: "street",
          width: "300px",
          disableSorting: true,
        },
        { title: "City", name: "city", $priority: 3 },
        { title: "State", name: "state", $priority: 4 },
        { title: "Zip Code", name: "zipCode" },
      ]}
    />
  )
}
```

## How it works

It basically will always try to adapt to the viewport, wether it is horizontally or vertically.

Regarding the widths, columns will either set themselves automatically based on their titles' lengths, or use fixed widths if given in the columns definitions. Based on those widths, the table might hide low priority columns first upon width reduction to keep a nice aspect with proper proportions.

About the height of the table, it will automatically be set considering the screen height (100vh) reduced by a height of your choice to fit your page layout and autoresize within its allocated space.

When a column is hidden for a lack of space, an icon will show up on the right-hand side to show the hidden contents of the entry right beneath the clicked line.

The sorting allows 2 criteria at the same time, the first activated being prioritized. They can be reset using the right-hand side icon. Sorting works on dates too. If you don't want a column to be sortable, it can be specified in the column definition.

While paginated, the bottom of the table includes an explanation on the left stating the number of the items displayed out of the total number of pages. On the right is the navigation panel with close pages, next, previous and direct access to start and end pages.

Finally, the search bar will show matches instantly but won't shorten the selection before 'enter' or icon click, highlighting the matches for better readability. Compressed entries shown upon 'enter' or icon click with no highlighted content means the match is inside the details box, shown on click. Clicking the bin icon will reset the search and return the full table data again.

## Props

- data : Array of objects.
- columns : Array of objects, the bare minimum is to give the names of the field to match. In addition, it accepts :
  - title (the wanted title of the column)
  - width, optional (in px if you want a fixed width wider than the computed one)
  - $priority (from 1, it will influence the order of collapsing columns upon width reduction, 1 will be the last to remain in extreme compression, no priority given is low priority and last column will disappear first)
  - disableSorting (when given, it disables the sorting on that column)
- occupiedHeight : Number of pixels not to allocate to the table height, calculated on the basis of the screen height (100vh). The number of entries per page will be set automatically based on the font size and paddings in the available space.
- title (optional) : Table title, default no title.
- noSearchBar (optional) : wether to display the search bar or not, default includes search bar.
- style (optional) : default is blue. Accepts presets or object detailed below for style overrides, presets are :
  - "blackNwhite" (black and white)
  - "hrnet" (greenish)

## Customizing style

The style presets use Styled-components are constructed this way :

```js
  {
    name: "myStyle",
    ButtonProps: {
      // self explanatory classes
      ".noBorder": ``,
      ".noBackground": ``,
    },
    CellProps: {},
    ColumnTitleProps: {
      width: ``,
      // colors of table headers for active sorting criteria
      $mainCriterionColor: MAIN_CRITERION_COLOR,
      $secondCriterionColor: SECONDARY_CRITERION_COLOR,
    },
    GuideProps: {
      backgroundColor: BACKGROUND_COLOR,
      // classes to align the side panels
      ".right": ``,
      ".left": ``,
    },
    IconProps: {},
    NavButtonProps: {
      ".active": ``,
    },
    SearchButtonProps: {},
    SearchFieldProps: {
      color: SEARCH_TEXT_COLOR,
    },
    SpanProps: {
      backgroundColor: `${HIGHLIGHTING_BACKGROUND_COLOR} !important`,
      color: HIGHLIGHTING_COLOR,
    },
    SubTableProps: {
      width: ``,
    },
    TableProps: {
      $linesBaseColor: LIGHTER_SHADE_OF_ALTERNATE_ENTRIES,
      ".bodyContainer": ``,
      thead: `
      background-color: ${COLUMN_TITLES_BACKGROUND_COLOR} !important;
      color: ${COLUMN_TITLES_COLOR};
      text-shadow: none !important;
    `,
    },
    TitleProps: {},
    WrapperProps: {
      $mainColor: BACKGROUND_COLOR,
      $secondaryColor: ``,
      width: ``,
      " .active": `
      background-color: ${ACTIVE_BACKGROUND_COLOR};
      color: ${ACTIVE_COLOR};
      `,
      " .inactive": `
      background-color: ${INACTIVE_BACKGROUND_COLOR};
      color: ${INACTIVE_COLOR};
      `,
      " .big": ``,
      " .ellipsis": ``,
    },
  },
```

The components defined with styled-components whose customizable props are listed above use a mixin which can possibly apply all these stylings :

backgroundColor, secondaryColor, color, width, height, borderRadius, fontWeight, fontSize, textAlign, minWidth, display, flexDirection, justifyContent, alignItems, gap, padding, margin, boxSzing, fontFamily, position, flexWrap, boxShadow, overflowY, tableLayout, borderCollapse, border, borderTop, borderBottom, borderRight, borderLeft, visibility, top, bottom, left, right, whiteSpace, textShadow, thead
