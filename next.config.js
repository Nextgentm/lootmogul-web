const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports =withBundleAnalyzer( {
  reactStrictMode: true,
  images: {
    domains: ["media-content.lootmogul.com","1.bp.blogspot.com","drive.google.com","lootmogalimages.s3.ap-south-1.amazonaws.com","s3-qunami.s3-us-west-2.amazonaws.com","gamification.tpix.in","localhost",
    "gpcms-prod.lootmogul.com","gamificationv2.s3.us-west-2.amazonaws.com","gamificationv2.s3.amazonaws.com","imgcdn.socialos.io",
    "s3-us-west-2.amazonaws.com"],
    minimumCacheTTL: 3600,
  },
 
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  
});
