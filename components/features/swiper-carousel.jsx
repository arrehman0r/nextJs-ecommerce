import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, FreeMode, Thumbs } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/**
 * SwiperCarousel - A drop-in replacement for OwlCarousel
 * Maps common owl-carousel options to swiper options
 */
const SwiperCarousel = forwardRef(function SwiperCarousel({ 
    children, 
    adClass = '', 
    options = {},
    onChangeRef,
    onChangeIndex,
    onSlideChange,
    thumbsSwiper
}, ref) {
    const swiperRef = useRef(null);
    const swiperInstanceRef = useRef(null);

    // Expose swiper instance methods via ref for parent components
    useImperativeHandle(ref, () => ({
        slideTo: (index, speed = 300) => {
            if (swiperInstanceRef.current) {
                swiperInstanceRef.current.slideTo(index, speed);
            }
        },
        swiper: swiperInstanceRef.current
    }), []);

    useEffect(() => {
        if (onChangeRef && swiperInstanceRef.current) {
            // Create a compatible ref object
            const compatRef = {
                current: {
                    slideTo: (index, speed = 300) => {
                        if (swiperInstanceRef.current) {
                            swiperInstanceRef.current.slideTo(index, speed);
                        }
                    },
                    swiper: swiperInstanceRef.current
                }
            };
            onChangeRef(compatRef);
        }
    }, [onChangeRef, swiperInstanceRef.current]);

    // Convert owl-carousel options to swiper options
    const convertOptions = (owlOptions) => {
        const {
            items = 1,
            loop = false,
            margin = 0,
            nav = true,
            dots = true,
            autoplay = false,
            autoplayTimeout = 5000,
            responsive = {},
            autoHeight = false,
        } = owlOptions;

        // Convert responsive breakpoints from owl format to swiper format
        const breakpoints = {};
        if (responsive) {
            Object.keys(responsive).forEach(breakpoint => {
                const bp = parseInt(breakpoint);
                breakpoints[bp] = {
                    slidesPerView: responsive[breakpoint].items || items,
                    spaceBetween: responsive[breakpoint].margin ?? margin,
                };
            });
        }

        return {
            slidesPerView: items,
            spaceBetween: margin,
            loop: loop,
            autoplay: autoplay ? {
                delay: autoplayTimeout,
                disableOnInteraction: false,
            } : false,
            navigation: nav,
            pagination: dots ? { clickable: true } : false,
            autoHeight: autoHeight,
            breakpoints: Object.keys(breakpoints).length > 0 ? breakpoints : undefined,
            modules: [Navigation, Pagination, Autoplay, FreeMode, Thumbs],
            thumbs: thumbsSwiper ? { swiper: thumbsSwiper } : undefined,
        };
    };

    const swiperOptions = convertOptions(options);

    // Don't render if no children
    if (!children) return null;
    
    // Ensure children is an array
    const childArray = React.Children.toArray(children);
    if (childArray.length === 0) return null;

    const handleSlideChange = (swiper) => {
        if (onChangeIndex) {
            onChangeIndex(swiper.realIndex);
        }
        if (onSlideChange) {
            onSlideChange(swiper);
        }
    };

    return (
        <Swiper
            ref={swiperRef}
            className={`swiper-carousel ${adClass}`}
            onSwiper={(swiper) => {
                swiperInstanceRef.current = swiper;
                if (onChangeRef) {
                    const compatRef = {
                        current: {
                            slideTo: (index, speed = 300) => swiper.slideTo(index, speed),
                            swiper: swiper
                        }
                    };
                    onChangeRef(compatRef);
                }
            }}
            onSlideChange={handleSlideChange}
            {...swiperOptions}
        >
            {childArray.map((child, index) => (
                <SwiperSlide key={index}>
                    {child}
                </SwiperSlide>
            ))}
        </Swiper>
    );
});

export default React.memo(SwiperCarousel);
