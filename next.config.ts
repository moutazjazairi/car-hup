import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.imagin.studio",'source.unsplash.com']
},
typescript: {
  ignoreBuildErrors:true,
}
};

export default nextConfig;
