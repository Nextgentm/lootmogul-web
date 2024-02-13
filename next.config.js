const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withPlugins = require("next-compose-plugins");
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {.lgkdkdsf:>
  staticPageGenerationTimeout: 700,
  sentry: {
    // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
    // for client-side builds. (This will be the default starting in
    // `@sentry/nextjs` version 8.0.0.) See
    // https://webpack.js.org/configuration/devtool/ and
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    // for more information.
    hideSourceMaps: true,
  },
  reactStrictMode: true,
  images: {
    domains: ["media-content.lootmogul.com","drive.google.com","lootmogalimages.s3.ap-south-1.amazonaws.com","s3-qunami.s3-us-west-2.amazonaws.com","localhost",
    "gpcms-prod.lootmogul.com","gamificationv2.s3.us-west-2.amazonaws.com","gamificationv2.s3.amazonaws.com","s3-us-west-2.amazonaws.com"],
    minimumCacheTTL: 3600,
  },
  experimental: { images: { allowFutureImage: true } },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      { 
        "source": '/login',
        "destination": process.env.NEXT_PUBLIC_WORDPRESS_URL+'/login',
        "permanent": true,
      },
      { 
        "source": '/terms-and-conditions-ios',
        "destination": process.env.NEXT_PUBLIC_WORDPRESS_URL+'/terms-and-conditions-ios',
        "permanent": true,
      },
      { 
        "source": '/',
        "destination": process.env.NEXT_PUBLIC_WORDPRESS_URL,
        "permanent": true,
      },
      { 
        "source": '/nft',
        "destination": "https://marketplace.lootmogul.com/",
        "permanent": true,
      },
      { 
        "source": '/about-us',
        "destination": process.env.NEXT_PUBLIC_WORDPRESS_URL+'/about-us',
        "permanent": true,
      },
      { 
        "source": '/privacy-policy',
        "destination": process.env.NEXT_PUBLIC_WORDPRESS_URL+'/privacy-policy',
        "permanent": true,
      },
      { 
        "source": '/terms-conditions',
        "destination": process.env.NEXT_PUBLIC_WORDPRESS_URL+'/terms-conditions',
        "permanent": true,
      },
      { 
        "source": '/faq',
        "destination": process.env.NEXT_PUBLIC_WORDPRESS_URL+'/faq',
        "permanent": true,
      },
      { 
        "source": '/metaverse',
        "destination": process.env.NEXT_PUBLIC_WORDPRESS_URL+'/metaverse',
        "permanent": true,
      },
      { 
        "source": '/influencers/category/basketball-player-influencer',
        "destination": '/influencers/category/basketball',
        "permanent": true,
      },
      {
        "source": '/influencers/category/hockey-player-influencers',
        "destination": '/influencers/category/hockey',
        "permanent": true,
      },
      {
        "source": '/influencers/category/mma-player-influencers',
        "destination": '/influencers/category/mma',
        "permanent": true,
      },
      {
        "source": '/influencers/category/baseball-player-influencer',
        "destination": '/influencers/category/baseball',
        "permanent": true,
      },
      {
        "source": '/influencers/category/cricket-influencers',
        "destination": '/influencers/category/cricket',
        "permanent": true,
      },
      {
        "source": '/influencers/category/food-influencers',
        "destination": '/influencers/category/food',
        "permanent": true,
      },
      {
        "source": '/influencers/category/football-influencers',
        "destination": '/influencers/category/football',
        "permanent": true,
      },
      {
        "source": '/influencers/category/general-influencers',
        "destination": '/influencers/category/general',
        "permanent": true,
      },
      {
        "source": '/influencers/category/soccer-player-influencer',
        "destination": '/influencers/category/soccer',
        "permanent": true,
      },
      {
        "source": '/influencers/category/lacrosse-player-influencer',
        "destination": '/influencers/category/lacrosse',
        "permanent": true,
      },
      {
        "source": "\/influencer\/ahmad-thomas-4",
        "destination": "\/influencers",
        "permanent": true
       },
       {
        "source": "\/influencer\/philip-evans",
        "destination": "\/influencers",
        "permanent": true
       },
       {
        "source": "\/influencer\/matthew-mooney",
        "destination": "\/influencers",
        "permanent": true
       },
       {
        "source": "\/influencer\/simisola-shittu",
        "destination": "\/influencers",
        "permanent": true
       },
       {
        "source": "\/influencer\/darius-victor",
        "destination": "\/influencers",
        "permanent": true
       },
       {
        "source": "\/influencer\/sterling-damarco-brown-2",
        "destination": "\/influencers",
        "permanent": true
       },
       {
        "source": "\/influencer\/glenn-gronkowski-4",
        "destination": "\/influencers",
        "permanent": true
       },
       {
        "source": "\/influencer\/simmi-shittu-3",
        "destination": "\/influencers",
        "permanent": true
       },
      {
        "source": '/influencers/earning',
        "destination": process.env.NEXT_PUBLIC_WORDPRESS_URL+'/influencer-earnings',
        "permanent": true,
      },
      {
        "source": '/influencers/signup',
        "destination": process.env.NEXT_PUBLIC_WORDPRESS_URL+'/ambassador-onboarding-form/',
        "permanent": true,
      },
      {
        "source": "\/promotions\/welcome-bonus",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/american-football-trivia-1",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/refer-a-friend-bonus",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/welcome-bonus-first-deposit-only-1",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/[id]",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/sandbox-event",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/build-your-own-metaverse-land-1",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/lisa-leslie",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/basketball-dunk-2",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/basketball-dunk-1",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/basketball-dunk",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/welcome-bonus-1",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/mma-trivia-1",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/march-madness",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/sign-up-2",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/stadium-seats-nf-ts",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/signup-bonus",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/create-nft",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/soccer-league-1",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/soccer-league",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/christmas-bonanza",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/football-april-draft-1",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/knock-it-off-1",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/knock-it-off",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/cricket-quiz-22-3",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/cricket-quiz-22-3",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/winter-olympics-quiz",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/play-bgmi-quiz",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/promotions\/cricket-quiz-22-1",
        "destination": "\/promotions",
        "permanent": true
       },
       {
        "source": "\/games\/happy-hours-leaderboard-contest",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/5",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/51",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/happy-hours",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/58",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/nba-play-in-tournament",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/craig-smith-basketball",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/march-madness",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/46",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/big-3-basketball-league",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/55",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/47",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/42",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/66",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/basketball-dunk-1",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/41",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/soccer-league",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/rudy-gay-basketball-1",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/8",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/16",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/rahul-chahar-cricket",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/24",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/56",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/9",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/27",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/65",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/6",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/60",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/31",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/daily-recurring-contest",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/14",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/football-draft-trivia",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/57",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/69",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/40",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/soccer-league",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/44",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/29",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/knock-it-off",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/may-baseball-league",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/25",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/15",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/28",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/12",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/knock-it-off",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/nba-play-in-tournament",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/43",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/football-april-draft",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/61",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/rudy-gay-basketball",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/26",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/73",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/7",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/52",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/49",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/39",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/[id]",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/68",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/mario-chalmers-basketball",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/59",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/lord-brunson-football",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/michael-beasley-basketball",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/darnell-rogers-basketball",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/kartik-tyagi-cricket",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/54",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/cricket-premier-league",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/andre-s-trivia",
        "destination": "\/games",
        "permanent": true
       },
       {
        "source": "\/games\/20",
        "destination": "\/games",
        "permanent": true
       }
    ]
  }
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// module.exports = withPlugins([withBundleAnalyzer], 
//   withSentryConfig(moduleExports, sentryWebpackPluginOptions));

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);

// module.exports =withBundleAnalyzer( {// });
