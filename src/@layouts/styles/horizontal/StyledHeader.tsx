// Third-party Imports
import type { CSSObject } from '@emotion/styled'
import styled from '@emotion/styled'

// Config Imports
import { useMediaQuery } from '@mui/material'

import themeConfig from '@configs/themeConfig'

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'

type StyledHeaderProps = {
  overrideStyles?: CSSObject
}

// Define StyledHeader as a functional component
const StyledHeaderComponent = () => {
  // Move the useMediaQuery hook inside the component
  const isMobile = useMediaQuery('(max-width:600px)')
  const padding = isMobile ? themeConfig.layoutPadding.mobile : themeConfig.layoutPadding.desktop

  const StyledHeader = styled.header<StyledHeaderProps>`
    box-shadow: var(--mui-customShadows-xs);

    [data-skin='bordered'] & {
      box-shadow: none;
      border-block-end: 1px solid var(--border-color);
    }

    &:not(.${horizontalLayoutClasses.headerBlur}) {
      background-color: var(--mui-palette-background-paper);
    }

    &.${horizontalLayoutClasses.headerBlur} {
      backdrop-filter: blur(6px);
      background-color: rgb(var(--background-color-rgb) / 0.88);
    }

    &.${horizontalLayoutClasses.headerFixed} {
      position: sticky;
      inset-block-start: 0;
      z-index: var(--header-z-index);
    }

    &.${horizontalLayoutClasses.headerContentCompact} .${horizontalLayoutClasses.navbar} {
      margin-inline: auto;
      max-inline-size: ${themeConfig.compactContentWidth}px;
    }

    .${horizontalLayoutClasses.navbar} {
      position: relative;
      min-block-size: var(--header-height);
      padding-block: 8px;
      padding-inline: ${padding}px;
    }

    ${({ overrideStyles }) => overrideStyles}
  `

  return <StyledHeader>{/* header content here */}</StyledHeader>
}

export default StyledHeaderComponent
