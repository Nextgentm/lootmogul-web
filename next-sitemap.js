/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: process.env.SITE_URL || 'https://lootmogul.com',
    generateRobotsTxt: process.env.NEXT_PUBLIC_SENTRY_ENV === 'production' ? true : false, // (optional)
    // ...other options
  }
  