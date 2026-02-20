import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
// import Custom Components
import ALink from '~/components/features/custom-link';

// Dynamic import for Swiper - modern carousel replacement
const SwiperCarousel = dynamic(() => import('~/components/features/swiper-carousel'), {
    ssr: false,
    loading: () => <div style={{ minHeight: '630px', backgroundColor: '#46b2e8' }} />
});

// Dynamic import for animations - not needed for initial paint
const Reveal = dynamic(() => import('react-awesome-reveal').then(mod => mod.Reveal), {
    ssr: false,
    loading: () => ({ children }) => <>{children}</>
});

import { fadeInUpShorter, fadeInRightShorter } from '~/utils/data/keyframes';
import banner1 from "./../../../public/images/banners/partyshope_banner.jpg"

// Swiper options for intro slider
const introSliderOptions = {
    items: 1,
    loop: false,
    nav: false,
    dots: true,
    autoplay: false
};

function IntroSection(props) {
    return (
        <SwiperCarousel adClass="intro-slider animation-slider" options={introSliderOptions}>
            <div className="banner banner-fixed intro-slide1" style={{ backgroundColor: "#46b2e8" }}>
                <figure>
                    <Image
                        src={banner1}
                        alt="Party Shope - Online Party Store Banner"
                        width={1920}
                        height={630}
                        priority={true}
                        placeholder="blur"
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </figure>

                <div className="container">
                    <div className="banner-content y-50">
                        <h4 className="banner-subtitle font-weight-bold ls-l d-flex align-items-center">
                            <Reveal keyframes={fadeInRightShorter} delay={200} duration={1000}>
                                <span className="d-inline-block">Buy 2 Get</span>
                            </Reveal>

                            <Reveal keyframes={fadeInRightShorter} delay={400} duration={1000}>
                                <span className="d-inline-block label-star bg-white text-primary">1 Free</span>
                            </Reveal>
                        </h4>

                        <Reveal keyframes={fadeInUpShorter} delay={1000} duration={1200}>
                            <h2 className="banner-title font-weight-bold text-white lh-1 ls-md">Party</h2>

                            <h3 className="font-weight-normal lh-1 ls-l text-white">Collection</h3>

                            <p className="text-white ls-s mb-7">Get Free Shipping on all orders over Rs.2000</p>
                        </Reveal>

                        <Reveal keyframes={fadeInUpShorter} delay={1800} duration={1000}>
                            <ALink href="/shop/all-products" className="btn btn-dark btn-rounded">Shop Now<i className="d-icon-arrow-right"></i></ALink>
                        </Reveal>
                    </div>
                </div>
            </div>
        </SwiperCarousel>
    )
}

export default React.memo(IntroSection);
