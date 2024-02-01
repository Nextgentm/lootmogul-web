/* eslint-disable react/jsx-key */
import dynamic from 'next/dynamic'

const Header = dynamic(() => import("../src/components/Header"));
const Footer = dynamic(() => import("../src/components/Footer"));
const ChakraUIContainer = dynamic(() => import("../src/styles/index"));

import { AppContextContainer } from "../src/utils/AppContext/index";
import MyPageLoader from "../src/components/MyPageLoader";

import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons/faTelegramPlane';

import { library } from '@fortawesome/fontawesome-svg-core'

const StickySocialIcons = dynamic(() => import("../src/components/StickySocialIcons"));

import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import "../styles/globals.css";
import * as ga from '../src/services/googleAnalytics';
import * as ct from '../src/services/clevertapAnalytics';
import LMNonCloseALert from '../src/components/LMNonCloseALert';
import MaintenancePage from '../src/features/MaintenancePage';
import * as Sentry from '@sentry/nextjs';
//import Snowfall from 'react-snowfall';

library.add(faTelegramPlane);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});


export function reportWebVitals({ id, name, label, value }) {
  // Use `window.gtag` if you initialized Google Analytics as this example:
  // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js
  window.gtag('event', name, {
    event_category:
      label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  })
}



function MyApp({ Component, pageProps }) {

  const router = useRouter();
  const { pathname } = router;
  const { provider, trackingCode, utm_medium, utm_source, referral_code, utm_term, utm_campaign, utm_content } = router.query

  const excludedPatterns = ['/games/', '/joining', '/quizPage'];
  const shouldExclude = excludedPatterns.some(pattern => pathname.startsWith(pattern));
  const shouldRenderSnowfall = !shouldExclude;
  let jwt_token = '';
  if (typeof window !== 'undefined') {
    jwt_token = window.localStorage?.getItem("token") ? window.localStorage?.getItem("token") : window.localStorage?.getItem("strapi_jwt");
}

  const handleRouteChange = (url) => {
    ga.pageview(url)
    if(jwt_token){
      ct.pageview(url)
    }

  };
  const [loading, setLoading] = useState(false);

  const [gameLoading, setGameLoading] = useState(false);

  const [loadParticles, setLoadParticles] = useState(true);
  const [stickyBtn, setStickyBtn] = useState(false);


  useEffect(() => {
    if (provider && trackingCode) {
      if (typeof window !== 'undefined') {
        window.localStorage?.setItem("proivder", provider);
        window.localStorage?.setItem("trackingCode", trackingCode);
      }
    }
  }, [provider, trackingCode]);

  useEffect(() => {
    if (utm_source || utm_medium || utm_term || utm_campaign || utm_content) {
      if (typeof window !== 'undefined') {
        window.localStorage?.setItem("utm_source", utm_source);
        window.localStorage?.setItem("utm_medium", utm_medium);
        window.localStorage?.setItem("utm_term", utm_term);
        window.localStorage?.setItem("utm_campaign", utm_campaign);
        window.localStorage?.setItem("utm_content", utm_content);
      }
    }
  }, [utm_source, utm_medium, utm_term, utm_campaign, utm_content]);


  useEffect(() => {
    if (referral_code) {
      if (typeof window !== 'undefined') {
        window.localStorage?.setItem("referral_code", referral_code);
      }
    }
  }, [referral_code]);

  useEffect(() => {

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };

  }, [router.events]);

  const onSentry = () => {
    const myException = { message: 'Something went wrong', code: 500 };

    Sentry.captureMessage(JSON.stringify(myException));
    
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraUIContainer>
        <AppContextContainer>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
            />
          </Head>
          {process.env.NEXT_PUBLIC_MAINTENANCE === 'true' ? <MaintenancePage></MaintenancePage> : <>
            {router.route === "/" ? '' : <Header />}
            {stickyBtn && router.route !== "/" ? <StickySocialIcons /> : ''}
            {/*shouldRenderSnowfall && <Snowfall
              // The color of the snowflake, can be any valid CSS color.
              color="#dee4fd"
              speed={[1.2,1.3]}
              wind={[-0.5,-0.5]}
              // Controls the number of snowflakes that are created (defaults to 150).
              snowflakeCount={300}
              radius={[0.5,3]}
            />
  */}
            {/* <Button onClick={onSentry}>hello</Button> */}
            <Component
              {...pageProps}
              loading={loading}
              setLoading={setLoading}
              setGameLoading={setGameLoading}
            />
            {loading && <MyPageLoader />}
            {gameLoading && <LMNonCloseALert
              header={""}
              canClose={false}
              data="loading...."
              isOpen={gameLoading}
              onClose={() => {
                setGameLoading(false);
              }
              }
            />
            }

            {router.route === "/" || router.route === "/gamecampaign" || router.route === "/thanksgiving-campaign" || router.route === "/signupcampaign" || router.route === "/dsg"  ? '' : <Footer />}
            <img style={{display:'none'}} src="/assets/loader/loader.200.120kb.gif" width={200} height={200} alt="Loader..." />

          </>}

        </AppContextContainer>
      </ChakraUIContainer>
    </QueryClientProvider>
  );
}

export default MyApp;
