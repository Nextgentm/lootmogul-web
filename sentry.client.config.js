// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const SENTRY_ENV = process.env.SENTRY_ENV || process.env.NEXT_PUBLIC_SENTRY_ENV;

Sentry.init({
  dsn: SENTRY_DSN || 'https://3314cb62253549e3b37e7875c76f263f@o4504314615300096.ingest.sentry.io/4504314860339200',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  environment: SENTRY_ENV,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
