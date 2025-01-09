'use client'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import { useMediaQuery } from '@mui/material'

import type { ChildrenType } from '@core/types'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'

// Styled Component Imports
import StyledMain from '@layouts/styles/shared/StyledMain'

const LayoutContent = ({ children }: ChildrenType) => {
  // Hooks
  const { settings } = useSettings()

  // Vars
  const contentCompact = settings.contentWidth === 'compact'
  const contentWide = settings.contentWidth === 'wide'
  const isMobile = useMediaQuery('(max-width:600px)')
  const padding = isMobile ? themeConfig.layoutPadding.mobile : themeConfig.layoutPadding.desktop

  return (
    <StyledMain
      isContentCompact={contentCompact}
      className={classnames(horizontalLayoutClasses.content, 'flex-auto', {
        [`${horizontalLayoutClasses.contentCompact} is-full`]: contentCompact,
        [horizontalLayoutClasses.contentWide]: contentWide
      })}
      style={{ padding: padding }}
    >
      {children}
    </StyledMain>
  )
}

export default LayoutContent
