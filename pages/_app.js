/* eslint-disable react/jsx-key */
import dynamic from 'next/dynamic'

const Header = dynamic(() => import("../src/components/Header"));
const Footer = dynamic(() => import("../src/components/Footer"));
const ChakraUIContainer = dynamic(() => import("../src/styles/index"));

import { AppContextContainer } from "../src/utils/AppContext/index";
import MyPageLoader from "../src/components/MyPageLoader";



const StickySocialIcons = dynamic(() => import("../src/components/StickySocialIcons"));

import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import "../styles/globals.css";
import * as ga from '../src/services/googleAnalytics';
import LMNonCloseALert from '../src/components/LMNonCloseALert';

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
  const { provider, trackingCode, utm_medium, utm_source, referral_code, utm_term, utm_campaign, utm_content } = router.query

  const handleRouteChange = (url) => {
    ga.pageview(url)

  };
  const [loading, setLoading] = useState(false);

  const [gameLoading, setGameLoading] = useState(false);

  const [loadParticles, setLoadParticles] = useState(true);
  const [stickyBtn, setStickyBtn] = useState(true);

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
        window.localStorage?.setItem("utm_term", utm_medium);
        window.localStorage?.setItem("utm_campaign", utm_medium);
        window.localStorage?.setItem("utm_content", utm_medium);
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

useEffect(()=>{
  if(router){
  // if(router.route === "/terms-of-services") setLoadParticles(false);
  // else setLoadParticles(true);
  if(router.route === "/terms-and-conditions-ios" || router.route === "/quizPage" || router.route === "/joining" ) setStickyBtn(false);
  else setStickyBtn(true);
}
}, [loadParticles, router])

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
          <Header />
          {/* {loadParticles &&  <ParticlesPage/>} */}
          {stickyBtn && <StickySocialIcons />}
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
          {/* <div style={style}>
          <GridLoader
            color={"#DDBF79"}
            loading={loading}
            size={20}
           
          />
          </div> */}

          <Footer />
        </AppContextContainer>
      </ChakraUIContainer>
    </QueryClientProvider>
  );
}

export default MyApp;
