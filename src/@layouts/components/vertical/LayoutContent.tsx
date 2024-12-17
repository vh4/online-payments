'use client'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import { Provider } from 'react-redux'

import type { ChildrenType } from '@core/types'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

// Styled Component Imports
import store from '@/app/store'
import StyledMain from '@layouts/styles/shared/StyledMain'

const LayoutContent = ({ children }: ChildrenType) => {
  // Hooks
  const { settings } = useSettings()

  // Vars
  const contentCompact = settings.contentWidth === 'compact'
  const contentWide = settings.contentWidth === 'wide'

  return (
    <StyledMain
      isContentCompact={contentCompact}
      className={classnames(verticalLayoutClasses.content, 'flex-auto', {
        [`${verticalLayoutClasses.contentCompact} is-full`]: contentCompact,
        [verticalLayoutClasses.contentWide]: contentWide
      })}
    >
      <Provider store={store}>{children}</Provider>
    </StyledMain>
  )
}

export default LayoutContent
