import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Google Tag Manager */}
          <script
            // dangerouslySetInnerHTML={{
            //   __html: `
            //     (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            //     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            //     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            //     'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            //     })(window,document,'script','dataLayer','GTM-PBWSVMP6');
            //   `,
            // }}
          />
          {/* Meta Pixel Code */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '308078109064492');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=308078109064492&ev=PageView&noscript=1"
              alt="Facebook Pixel"
            />
          </noscript>

          <link rel="icon" href="/images/icons/favicon.png" />
          
          {/* Preconnect to external domains for faster resource loading */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://connect.facebook.net" />
          
          {/* Google Fonts with font-display: swap to prevent FOIT */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          />
          
          {/* Critical icon fonts - preload for LCP */}
          <link
            rel="preload"
            href="/vendor/riode-fonts/riode-fonts.css"
            as="style"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/vendor/riode-fonts/riode-fonts.css"
          />
          
          {/* Non-critical CSS - load with lower priority */}
          <link
            rel="stylesheet"
            type="text/css"
            href="/vendor/fontawesome-free/css/all.min.css"
            media="print"
            onLoad="this.media='all'"
          />
          
          {/* jQuery removed - using Swiper instead of owl-carousel which doesn't need jQuery */}
        </Head>
        <body>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-PBWSVMP6"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
