/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
     rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js"
        }
      }
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "koreandummyjson.vercel.app"
      },
      {
        protocol: "http",
        hostname: "localhost"
      }
    ]
  }
};

export default nextConfig;
