/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["https://go-umkm-smg.vercel.app"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
