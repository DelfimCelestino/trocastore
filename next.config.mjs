/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/", // Rota principal
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0, must-revalidate",
          },
        ],
      },
    ]
  },
  httpAgentOptions: {
    keepAlive: true,
  },
}

export default nextConfig
