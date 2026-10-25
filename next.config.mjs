/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static files only, for GitHub Pages: `yarn build` writes them to out/.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
