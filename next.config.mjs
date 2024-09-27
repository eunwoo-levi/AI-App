/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"], // 허용할 외부 도메인 추가
  },
};

export default nextConfig;
