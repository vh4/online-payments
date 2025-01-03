// React Imports
import Image from 'next/image'
import type { SVGAttributes } from 'react'

const Logo = (props: SVGAttributes<SVGElement>) => {
  return (
    <>
      <Image src='/logo.png' height={40} width={120} alt='Logo' style={{}} />
    </>
  )
}

export default Logo
