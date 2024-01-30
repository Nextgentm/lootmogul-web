import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            defer
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-579077647" />
<script  dangerouslySetInnerHTML={{
              __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-579077647');`}}
/>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
           <script defer
    dangerouslySetInnerHTML={{
      __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER}');`,
    }}
  />
 {process.env.CLEVER_TAP_STATUS == 'true' && 
  <script defer  dangerouslySetInnerHTML={{
                __html:
      ` var clevertap = {event:[], profile:[], account:[], onUserLogin:[], notifications:[], privacy:[]};
      
      clevertap.account.push({ "id": "${process.env.NEXT_PUBLIC_CLEVER_TAP_PROJECT}" });// prod
      clevertap.privacy.push({optOut: false}); //set the flag to true, if the user of the device opts out of sharing their data
  clevertap.privacy.push({useIP: true}); //set the flag to true, if the user agrees to share their IP data
  (function () {
          var wzrk = document.createElement('script');
          wzrk.type = 'text/javascript';
          wzrk.async = true;
          wzrk.src = ('https:' == document.location.protocol ? 'https://d2r1yp2w7bby2u.cloudfront.net' : 'http://static.clevertap.com') + '/js/clevertap.min.js';        
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(wzrk, s);
    })();`,}}
  />
}
<script
  type="module"
  src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
></script>
<link rel="manifest" href="/manifest.json" />
<link
          rel="preload"
          href="/fonts/Blanch/BLANCH_CAPS.otf"
          as="font"
          crossOrigin="anonymous"
        />
       
        </Head>
        <body>
          <Main />
          <NextScript />
          <noscript
    dangerouslySetInnerHTML={{
      __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER}" height="0" width="0" style="display: none; visibility: hidden;" />`,
    }}
  />
        </body>
      </Html>
    )
  }
}