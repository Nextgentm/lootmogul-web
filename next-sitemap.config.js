/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    generateRobotsTxt: process.env.NEXT_PUBLIC_SENTRY_ENV === 'production' ? true : false, // (optional)
    // ...other options
  }
  