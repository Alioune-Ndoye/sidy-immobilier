import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Inclut le moteur de requête Prisma (généré dans src/generated/prisma)
  // dans le bundle des fonctions serverless Vercel.
  outputFileTracingIncludes: {
    "/**": ["./src/generated/prisma/**/*"],
    "/api/**": ["./src/generated/prisma/**/*"],
  },

  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"lh3.googleusercontent.com"
      },
      {
        protocol:"https",
        hostname:"res.cloudinary.com"
      }
    ]
  }
};

export default nextConfig;
