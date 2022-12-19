// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const SENTRY_ENV = process.env.SENTRY_ENV || process.env.NEXT_PUBLIC_SENTRY_ENV;

Sentry.init({
  dsn: SENTRY_DSN || 'https://12600968317b46e8ae982ccfdced50ab@o4504293426397184.ingest.sentry.io/4504293427904512',
  tracesSampleRate: 1.0,
  environment: SENTRY_ENV,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});