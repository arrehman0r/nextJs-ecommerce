import { useEffect } from 'react';
import { useStore, Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import Helmet from "react-helmet";
import { SWRConfig } from 'swr';

import { wrapper } from "../store/index.js";
import Layout from '~/components/layout';

import { demoActions } from '~/store/demo';

import { currentDemo } from '~/server/queries';

import "~/public/sass/style.scss";
// import ReactPixel from 'react-facebook-pixel';

const App = ({ Component, pageProps }) => {
    const store = useStore();

    useEffect(() => {
        // ReactPixel.init('308078109064492');
        if (store.getState().demo.current !== currentDemo) {
            store.dispatch(demoActions.refreshStore(currentDemo));
        }
    }, [])

    return (
        <Provider store={store}>
            <PersistGate
                persistor={store.__persistor}
                loading={<div className="loading-overlay">
                    <div className="bounce-loader">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                        <div className="bounce4"></div>
                    </div>
                </div>}>
                <SWRConfig 
                    value={{
                        revalidateOnFocus: false,
                        revalidateOnReconnect: false,
                        dedupingInterval: 300000, // 5 minutes - dedupe requests
                        errorRetryCount: 2,
                    }}
                >
                    <Helmet>
                        <meta charSet="UTF-8" />
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                        <title>Party - Online Party Store</title>

                        <meta name="keywords" content="Party Shope" />
                        <meta name="description" content="Party Shop Web Store" />
                        <meta name="author" content="Abdul Rehman" />
                    </Helmet>

                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </SWRConfig>
            </PersistGate>
        </Provider>
    );
}

App.getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
};

export default wrapper.withRedux(App);