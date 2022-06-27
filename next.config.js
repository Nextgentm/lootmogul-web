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
  async redirects() {
    return [
      {
        source: '/influencers/category/basketball-player-influencer',
        destination: '/influencers/category/basketball',
        permanent: true,
      },
      {
        source: '/influencers/category/hockey-player-influencers',
        destination: '/influencers/category/hockey',
        permanent: true,
      },
      {
        source: '/influencers/category/mma-player-influencers',
        destination: '/influencers/category/mma',
        permanent: true,
      },
      {
        source: '/influencers/category/baseball-player-influencer',
        destination: '/influencers/category/baseball',
        permanent: true,
      },
      {
        source: '/influencers/category/cricket-influencers',
        destination: '/influencers/category/cricket',
        permanent: true,
      },
      {
        source: '/influencers/category/food-influencers',
        destination: '/influencers/category/food',
        permanent: true,
      },
      {
        source: '/influencers/category/football-influencers',
        destination: '/influencers/category/football',
        permanent: true,
      },
      {
        source: '/influencers/category/general-influencers',
        destination: '/influencers/category/general',
        permanent: true,
      },
      {
        source: '/influencers/category/soccer-player-influencer',
        destination: '/influencers/category/soccer',
        permanent: true,
      },
      {
        source: '/influencers/category/lacrosse-player-influencer',
        destination: '/influencers/category/lacrosse',
        permanent: true,
      },
      
    ]
  },
  
});
