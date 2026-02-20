import React from 'react';
import dynamic from 'next/dynamic';

const SwiperCarousel = dynamic(() => import('~/components/features/swiper-carousel'), {
    ssr: false,
    loading: () => null
});

const Reveal = dynamic(() => import('react-awesome-reveal').then(mod => mod.Reveal), {
    ssr: false,
    loading: () => ({ children }) => <>{children}</>
});

import { fadeInRightShorter } from '~/utils/data/keyframes';

// Swiper options for service slider
const serviceSliderOptions = {
    items: 3,
    nav: false,
    dots: false,
    margin: 0,
    loop: false,
    autoplay: false,
    responsive: {
        0: { items: 1 },
        576: { items: 2 },
        768: { items: 3 }
    }
};

function ServiceBox(props) {
    return (
        <div className="container mt-6">
            <div className="service-list">
                <SwiperCarousel adClass="" options={serviceSliderOptions}>
                    <Reveal keyframes={fadeInRightShorter} delay={300} duration={1200} triggerOnce>
                        <div className="icon-box icon-box-side icon-box1">
                            <i className="icon-box-icon d-icon-truck"></i>

                            <div className="icon-box-content">
                                <h4 className="icon-box-title text-capitalize ls-normal lh-1">Free Shipping &amp; Return</h4>

                                <p className="ls-s lh-1">Free shipping on orders over Rs.2000</p>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal keyframes={fadeInRightShorter} delay={400} duration={1200} triggerOnce>
                        <div className="icon-box icon-box-side icon-box2">
                            <i className="icon-box-icon d-icon-service"></i>

                            <div className="icon-box-content">
                                <h4 className="icon-box-title text-capitalize ls-normal lh-1">Customer Support 24/7</h4>

                                <p className="ls-s lh-1">Instant access to perfect support</p>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal keyframes={fadeInRightShorter} delay={500} duration={1200} triggerOnce>
                        <div className="icon-box icon-box-side icon-box3">
                            <i className="icon-box-icon d-icon-secure"></i>

                            <div className="icon-box-content">
                                <h4 className="icon-box-title text-capitalize ls-normal lh-1">100% Secure Payment</h4>

                                <p className="ls-s lh-1">We ensure secure payment!</p>
                            </div>
                        </div>
                    </Reveal>
                </SwiperCarousel>
            </div>
        </div>
    )
}

export default React.memo(ServiceBox);