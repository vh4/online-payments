'use client'

import { BadgeCheck, CircleAlert, Info, TriangleAlert } from 'lucide-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToasterContainer = () => {
  return (
    <ToastContainer
      icon={({ type }) => {
        switch (type) {
          case 'info':
            return <Info className='stroke-indigo-400' />
          case 'error':
            return <CircleAlert className='stroke-red-500' />
          case 'success':
            return <BadgeCheck className='stroke-green-500' />
          case 'warning':
            return <TriangleAlert className='stroke-yellow-500' />
          default:
            return <CircleAlert className='stroke-red-500' />
        }
      }}
    />
  )
}

export default ToasterContainer
