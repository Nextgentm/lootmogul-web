const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
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
    domains: ["media-content.lootmogul.com","drive.google.com","lootmogalimages.s3.ap-south-1.amazonaws.com","s3-qunami.s3-us-west-2.amazonaws.com","gamification.tpix.in","localhost",
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
        "source": "\/influencer\/Norris-cole",
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
        source: '/influencers/earning',
        destination: 'https://metaverse.lootmogul.com/influencer-earnings',
        permanent: true,
      },
      {
        source: '/influencers/signup',
        destination: 'https://metaverse.lootmogul.com/ambassador-onboarding-form/',
        permanent: true,
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
        "source": "\/nfts\/Mat-Robson-Gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/corsleyedwardsgold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/undefined",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/behumblebenicebutbeamonster",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mikeoutlawgold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Jullian-Allen-Gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Sterling-D.-Brown-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/jeremy-hill-gold-collection",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/corsleyedwardsbronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mariochalmersviewmytattoowithdeffects",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/candicedupreebronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/marvinsmithplatinum",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/ahmad-thomas-meta-avatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/xavier-kelly-platinum-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/darrell-fullington-meta-avatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/dariusvitovictorgold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/antonio-andrews-meta-avatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/terrencealexandergold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/gheorghe-muresan-platinum-trading-card",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/chrisfinkebronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/charlie-mosey-meta-avatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/chris-finke-meta-avatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/gheorghe-muresan-gold-trading-card",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/philipevansbronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/karloswilliamsgold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/harvey-grant-platinum",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/harvey-grant-meta-avatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/null",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/craigsmithbronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/qyntel-deon-woods-bronze-trading-card",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mario-chalmers-challenger-beat-the-heat-b-w",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Simi-Shittu-Bronze-Collection",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Karlos-Williams-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/lisa-leslie-platinum-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Corsley-Edwards-Platinum",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Ahmad-Thomas-Gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/lisa-leslie-loot-mogul-founders-collection",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Lord-Brunson-Series-1",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/alex-bentley-meta-avatar-nft-2",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Karlos-Williams-Gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/DerMarr-Slim-Johnson-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mario-chalmers-play-super-mario-chalmers-game",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Matt-Mooney-Gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/farrington-huguenin-platinum-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/raquel-pennington-rare-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Kyle-Prater-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/norris-cole-meta-avatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Sweating",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/kareemrushgold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Trevin-Wade-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/michaelbeasleygold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Farrington-Huguenin-Gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/trenton-irwin-bronze-1",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/robertjamesturbingold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Jamal-Carter-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Tre-Simmons-Gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/scottrodgersgold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mattmooneygold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/raquelpenningtongold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/simi-shittu-meta-avatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Errol-A-Robinson-Gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/marvinsmithbronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mariochalmersplaysupermariochalmersgame",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/lord-brunson-series-1-test-1",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/arthurlewisjrplatinum",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/corsley-edwards-gold-1",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/jeremy-hill-meta-avatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/keith-kinkaid-platinum-trading-card",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/philipevansgold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/stefan-frei-platinum-trading-card",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/qyntel-deon-woods-gold-trading-card",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/charlie-mosey-bronze-trading-card",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/scott-rogers-gold-trading-card",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/[id]",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/scott-rogers-bronze-trading-card",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mat-robinson-platinum-trading-card",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mat-robinson-gold-trading-card",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mayank-dagar-bronze-trading-card",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mayank-dagar-platinum-trading-card",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/simishittugoldcollection",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/lisa-leslie-platinum",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/corsley-edwards-meta-avatar-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/xavier-kelly-rare-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/corsley-edwards-monster-nft-gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/xavier-kelly-monster-nft-bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/corsley-edwards-platinum-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mario-chalmers-meta-avatar-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/raquel-pennington-meta-avatar-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/carlos-boozer-meta-avatar-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/corsley-edwards-rare-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/xavier-kelly-monster-nft-gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/raquel-pennington-monster-nft-gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/lisa-leslie-monster-gold-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mario-chalmers-roaring-tiger",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/jermain-taylor-meta-avatar-ii",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/raquelpenningtonbronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/kareem-rush-meta-avatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/marvin-smith-meta-avatar-1",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/patrick-robinson-meta-avatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/matt-mooney-platinum-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/rick-barry-monster-bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/raquel-penington-rare",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/antonio-andrews-gold-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/raquel-pennington-monster-bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/deborah-sawaf-loot-mogul-founders-collection-nft-ix",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Terrence-Alexander-Gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/der-marr-slim-johnson-meta-avatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/michael-cooper-meta-avatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/kylepratergold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/raquel-pennington-gold-trading-card",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/marvin-smith-platinum",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/corsley-edwards-monster-nft-bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/karlos-williams-platinum-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/raquel-pennington-platinum-1",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/qyntel-woods-meta-avatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/rick-barry-platinum",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/lord-brunson-bronze-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/rick-barry-monster-gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/devante-bond-rare",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/antonio-andrews-platinum-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/luis-da-silva-jr-meta-avatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/jullianallengold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/devante-bond-platinum-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/trentonirwinbronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mike-outlaw-platinum-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/alex-bentley-bronze-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mario-chalmers-meta-avatar-1",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/devante-bond-monster-gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/raquel-pennington-monster-gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/sterlingdbrowngold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/chris-finke-platinum-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/simi-shittu-platinum-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/der-marr-slim-johnson-gold-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/glenn-gronkowski-bronze-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/dermarrslimjohnsonbronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/kyle-prater-platinum-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/der-marr-slim-johnson-platinum-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/errol-a-robinson-platinum-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/jake-fraley-platinum-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/jullian-allen-platinum-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/devante-bond-monster-bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/trey-william-meta-avatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/deborah-sawaf-loot-mogul-founders-collection-nft-x",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/trenton-irwin-platinum-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/rick-barry-meta-avatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/philip-evans-platinum-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/jermaine-taylor-meta-avatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/errol-a-robinson-meta-avatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mike-james-meta-avatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/curtis-cothran-platinum-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/lord-brunson-platinum-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/trenton-irwin-gold-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/darius-vito-v-platinum-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/jamalcarterbronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/sterling-damarco-brown-platinum-trading-card-nft",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/michael-beasley-meta-avatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/raquel-pennington-bronze-trading-card",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Stefan-Frei-Gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Mike-Outlaw-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Raquel-Pennington-Gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/kartiktyagibronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Nnamka-Samson-Ebukam-Gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/florian-valot-bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/behumblebenicebutbeamonsterbronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Keith-Kinkaid-Gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/terrencealexandergold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mikeoutlawgold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/nnamkasamsonebukamgold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/antonio-andrews-bronze-1",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/deborahsawaflootmogulfounderscollectioni",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mariochalmersviewmytattoowithdeffectbw",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/deborah-sawaf-loot-mogul-founders-collection-nft-viii",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mario-chalmers-snowy-winter-resting-by-fireside-bw",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/deborahsawaflootmogulfounderscollectioni1",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Philip-Evans-Gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Darius-Vito-Victor-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mario-chalmers-mirror-reflection",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Mike-Outlaw-Gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Jeremy-Hill-Bronze-Collection",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Errol-A-Robinson-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Charlie-Mosey-Premium-Collection",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/antonio-andrews-bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Mayank-Dagar-Platinum",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Simi-Shittu-Platinum-Collection",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Tre-Simmons-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Kyle-Prater-Gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Norris-Cole-Gold-Collection",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mario-chalmers-monster-bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Ahmad-Thomas-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Norris-Cole-Bronze-Collection",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Mario-Chalmers-Snowy-Winterresting-by-fireside-BW",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Curtis-Cothran-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Terrence-Alexander-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Lord-Brunson-Series-3",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Nnamka-Samson-Ebukam-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Raquel-Pennington-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Robert-James-Turbin-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Jake-Fraley-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Devante-Bond-Gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Farrington-Huguenin-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Jamal-Carter-Gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/marvinsmithplatinum",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/focusdeterminesyourreality",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/rakeem-boyd-touch-down",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/alwaysincharacter",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/rahulchaharmetaavatar",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/lordbrunsonseries",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/lordbrunsonseries2",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/lisa-leslie-founders-collection-basketball-legend-1",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/scottrodgersplatinum",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/hardworkspotlight",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/232",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/cananybodydothis",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/230",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/233",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Chris-Finke-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Devante-Bond-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mario-chalmers-rare",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mariochalmerssnowywinterrestingbyfiresid",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Xavier-Kelly-Day-that-changed-my-life",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Candice-Dupree-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Stefan-Frei-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Jake-Fraley-Gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/mario-chalmers-mirror-reflection-b-w-1",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Corsley-Edwards-Bronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Mayank-Dagar-Gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/philipevansgold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/Sterling-D.-Brown-Gold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/terrencealexanderbronze",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/farringtonhugueningold",
        "destination": "\/nfts",
        "permanent": true
       },
       {
        "source": "\/nfts\/xavier-kelly-day-that-changed-my-life-3",
        "destination": "\/nfts",
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
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// module.exports = withPlugins([withBundleAnalyzer], 
//   withSentryConfig(moduleExports, sentryWebpackPluginOptions));

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);

// module.exports =withBundleAnalyzer( {// });
