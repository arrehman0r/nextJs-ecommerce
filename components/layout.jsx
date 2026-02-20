import { useEffect, useLayoutEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';
import Header from '~/components/common/header';
import Footer from '~/components/common/footer';
import StickyFooter from '~/components/common/sticky-footer';
import MobileMenu from '~/components/common/partials/mobile-menu';
import AppLoader from './common/loader';

import { modalActions } from '~/store/modal';
import { setLoading } from '~/store/utils';
import { showScrollTopHandler, scrollTopHandler, stickyHeaderHandler, stickyFooterHandler, resizeHandler } from '~/utils';

// Dynamic imports for heavy components - only load when needed
const Quickview = dynamic(() => import('~/components/features/product/common/quickview-modal'), {
    ssr: false,
    loading: () => null
});

const VideoModal = dynamic(() => import('~/components/features/modals/video-modal'), {
    ssr: false,
    loading: () => null
});

// Lazy load ToastContainer - not needed at initial paint
const ToastContainer = dynamic(
    () => import('react-toastify').then(mod => {
        // Import CSS only when component loads
        import('react-toastify/dist/ReactToastify.min.css');
        return mod.ToastContainer;
    }),
    { ssr: false, loading: () => null }
);

function Layout({ children, closeQuickview }) {
    const router = useRouter();
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        document.querySelector('body') && document.querySelector('body').classList.remove('loaded');
    }, [router.pathname])

    useEffect(() => {
        // Route change handlers - show loader when navigating
        const handleRouteChangeStart = () => {
            dispatch(setLoading(true));
        };

        const handleRouteChangeComplete = () => {
            dispatch(setLoading(false));
        };

        const handleRouteChangeError = () => {
            dispatch(setLoading(false));
        };

        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);
        router.events.on('routeChangeError', handleRouteChangeError);

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
            router.events.off('routeChangeError', handleRouteChangeError);
        };
    }, [router, dispatch]);

    useEffect(() => {
        window.addEventListener('scroll', showScrollTopHandler, true);
        window.addEventListener('scroll', stickyHeaderHandler, true);
        window.addEventListener('scroll', stickyFooterHandler, true);
        window.addEventListener('resize', stickyHeaderHandler);
        window.addEventListener('resize', stickyFooterHandler);
        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('scroll', showScrollTopHandler, true);
            window.removeEventListener('scroll', stickyHeaderHandler, true);
            window.removeEventListener('scroll', stickyFooterHandler, true);
            window.removeEventListener('resize', stickyHeaderHandler);
            window.removeEventListener('resize', stickyFooterHandler);
            window.removeEventListener('resize', resizeHandler);
        }
    }, [])

    useEffect(() => {
        closeQuickview();

        let bodyClasses = [...document.querySelector("body").classList];
        for (let i = 0; i < bodyClasses.length; i++) {
            document.querySelector('body').classList.remove(bodyClasses[i]);
        }

        setTimeout(() => {
            document.querySelector('body').classList.add('loaded');
        }, 50);
    }, [router.pathname])

    return (
        <>
            <div className="page-wrapper">
                <Header />

                {children}

                <Footer />

                <StickyFooter />
            </div>

            <ALink id="scroll-top" href="#" title="Top" role="button" className="scroll-top" onClick={() => scrollTopHandler(false)}><i className="d-icon-arrow-up"></i></ALink>

            <MobileMenu />
            <AppLoader />
            <ToastContainer
                autoClose={3000}
                duration={300}
                newestOnTo={true}
                className="toast-container"
                position="bottom-left"
                closeButton={false}
                hideProgressBar={true}
                newestOnTop={true}
            />

            <Quickview />

            <VideoModal />
        </>
    )
}

export default connect(null, { closeQuickview: modalActions.closeQuickview })(Layout);