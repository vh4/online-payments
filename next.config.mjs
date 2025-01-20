/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true, // SWC for faster builds
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
