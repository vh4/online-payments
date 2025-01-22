/*
 * Configuration Notes:
 * Changes made to the following items in the `themeConfig` object won't affect the local development server directly
 * as these values are stored in cookies (which have the highest priority over the `themeConfig`):
 * 1. mode
 * 2. skin
 * 3. semiDark
 * 4. layout
 * 5. navbar.contentWidth
 * 6. contentWidth
 * 7. footer.contentWidth
 *
 * To apply these changes:
 * - Click the reset button in the Customizer (top-right corner near the close button),
 *   which resets the cookie to the `themeConfig` values.
 * - Alternatively, clear the cookies via the browser's Application/Storage tab and reload the page.
 */

// Type Imports
import type { Layout, LayoutComponentPosition, LayoutComponentWidth, Mode, Skin } from '@core/types'

type Navbar = {
  type: LayoutComponentPosition
  contentWidth: LayoutComponentWidth
  floating: boolean
  detached: boolean
  blur: boolean
}

type Footer = {
  type: LayoutComponentPosition
  contentWidth: LayoutComponentWidth
  detached: boolean
}

export type Config = {
  templateName: string
  homePageUrl: string
  settingsCookieName: string
  mode: Mode
  skin: Skin
  semiDark: boolean
  layout: Layout
  layoutPadding: {
    mobile: number
    desktop: number
  }
  navbar: Navbar
  contentWidth: LayoutComponentWidth
  compactContentWidth: number
  footer: Footer
  disableRipple: boolean
}

const themeConfig: Config = {
  templateName: 'Rajabiller',
  homePageUrl: '/home',
  settingsCookieName: 'materialize-mui-next-demo-1',
  mode: 'dark', // Options: 'system', 'light', 'dark'
  skin: 'bordered', // Options: 'default', 'bordered'
  semiDark: false,
  layout: 'vertical', // Options: 'vertical', 'collapsed', 'horizontal'
  layoutPadding: {
    mobile: 0,
    desktop: 12
  },
  compactContentWidth: 1440, // in pixels
  navbar: {
    type: 'fixed', // Options: 'fixed', 'static'
    contentWidth: 'wide', // Options: 'compact', 'wide'
    floating: false, // Not applicable for Horizontal Layout
    detached: true, // Not applicable for Horizontal Layout or when navbar is floating
    blur: true
  },
  contentWidth: 'wide', // Options: 'compact', 'wide'
  footer: {
    type: 'static', // Options: 'fixed', 'static'
    contentWidth: 'compact', // Options: 'compact', 'wide'
    detached: true // Not applicable for Horizontal Layout
  },
  disableRipple: false
}

export default themeConfig
