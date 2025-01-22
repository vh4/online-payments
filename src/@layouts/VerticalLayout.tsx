'use client'

// React Imports
import { useEffect, type ReactNode } from 'react'

import { usePathname } from 'next/navigation'

import { useDispatch } from 'react-redux'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { ChildrenType } from '@core/types'

// Component Imports
import LayoutContent from './components/vertical/LayoutContent'

// Util Imports
import { verticalLayoutClasses } from './utils/layoutClasses'

// Styled Component Imports
import { resetInquiry, resetPayment } from '@/app/store'

import StyledContentWrapper from './styles/vertical/StyledContentWrapper'

type VerticalLayoutProps = ChildrenType & {
  navigation?: ReactNode
  navbar?: ReactNode
  footer?: ReactNode
}

const VerticalLayout = (props: VerticalLayoutProps) => {
  // Props
  const { navbar, footer, navigation, children } = props

  const dispatch = useDispatch()
  const pathname = usePathname()

  useEffect(() => {
    const handleRouteChange = () => {
      dispatch(resetInquiry())
      dispatch(resetPayment())
    }

    // App Router doesn't have router.events; monitor router.push or navigation changes differently
    handleRouteChange() // Call the function when the component renders

    return () => {
      // Cleanup logic if necessary
    }
  }, [dispatch, pathname])

  return (
    <div className={classnames(verticalLayoutClasses.root, 'flex flex-auto')}>
      {navigation || null}
      <StyledContentWrapper
        className={classnames(verticalLayoutClasses.contentWrapper, 'flex flex-col min-is-0 is-full')}
      >
        {navbar || null}
        {/* Content */}
        <LayoutContent>{children}</LayoutContent>
        {footer || null}
      </StyledContentWrapper>
    </div>
  )
}

export default VerticalLayout
