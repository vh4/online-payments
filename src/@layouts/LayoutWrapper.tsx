'use client'

// React Imports
import type { ReactElement } from 'react'

import { Provider } from 'react-redux'

// Type Imports
import type { SystemMode } from '@core/types'

// Hook Imports
import store from '@/app/store'
import useLayoutInit from '@core/hooks/useLayoutInit'
import { useSettings } from '@core/hooks/useSettings'

type LayoutWrapperProps = {
  systemMode: SystemMode
  verticalLayout: ReactElement
  horizontalLayout: ReactElement
}

const LayoutWrapper = (props: LayoutWrapperProps) => {
  // Props
  const { systemMode, verticalLayout, horizontalLayout } = props

  // Hooks
  const { settings } = useSettings()

  useLayoutInit(systemMode)

  // Return the layout based on the layout context
  return (
    <div className='flex flex-col flex-auto' data-skin={settings.skin}>
      <Provider store={store}>{settings.layout === 'horizontal' ? horizontalLayout : verticalLayout}</Provider>
    </div>
  )
}

export default LayoutWrapper
