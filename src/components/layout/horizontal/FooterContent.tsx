'use client'

// Next Imports

// Third-party Imports
import classnames from 'classnames'

// Hook Imports

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks
  // const { isBreakpointReached } = useHorizontalNav()

  return (
    <div
      className={classnames(horizontalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      {/* <p>
        <span className='text-textSecondary'>{`© ${new Date().getFullYear()}, Made with `}</span>
        <span>{`❤️`}</span>
        <span className='text-textSecondary'>{` by `}</span>
        <Link href='https://rajabiller.com' target='_blank' className='text-primary uppercase'>
          rajabiller.com
        </Link>
      </p> */}
    </div>
  )
}

export default FooterContent
