'use client'

import { usePathname, useRouter } from 'next/navigation'

import Menuitems from '@/components/layout/vertical/menuItems'

const NotFound = () => {
  // Hooks
  const router = useRouter()
  const path = usePathname()

  // Find the menu item that matches the current path
  const menu = Menuitems.find(x => x.href === path)

  // Dynamic content based on the existence of the menu item
  const isMaintenance = !!menu
  const statusCode = isMaintenance ? '503' : '404'
  const message = isMaintenance ? 'Maaf, produk ini masih dalam maintenance.' : 'Maaf, halaman tidak ditemukan.'

  return (
    <main className='flex flex-col min-h-screen justify-center items-center'>
      <section className='container flex flex-col md:flex-row items-center justify-center px-5 text-center md:text-left'>
        {/* Status Code and Message */}
        <div className='max-w-md'>
          <h1 className={`text-6xl font-bold ${isMaintenance ? 'text-gray-500' : 'text-blue-600'}`}>{statusCode}</h1>
          <p className='mt-4 text-lg md:text-xl font-light leading-relaxed'>{message}</p>
          <button
            onClick={() => router.back()}
            className={`mt-6 px-6 py-3 ${
              isMaintenance
                ? 'bg-gray-500 hover:bg-gray-700 focus:ring-gray-300 active:bg-gray-800'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 active:bg-blue-800'
            } text-white text-sm font-medium leading-5 rounded-lg shadow focus:outline-none focus:ring`}
          >
            Kembali
          </button>
        </div>

        {/* 404 Image */}
        <div className='max-w-md mt-10 md:mt-0 md:ml-10'>
          <img src='/404.png' alt='Page not found illustration' className='w-full h-auto object-contain' />
        </div>
      </section>
    </main>
  )
}

export default NotFound
