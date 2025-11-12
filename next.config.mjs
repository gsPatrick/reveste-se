/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "geral-revesteseapi.r954jc.easypanel.host",
        pathname: "/uploads/imagens/**", // caminho permitido
      },
    ],
  },
};

export default nextConfig;
