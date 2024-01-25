import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './DefaultLayout.module.scss';
import { useClassNames } from '~/hooks';
import HeaderComponent from '~/components/HeaderComponent';
import FooterComponent from '~/components/FooterComponent';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    const cx = useClassNames(styles);

    const [scrollTopValue, setScrollTopValue] = useState(0);
    const containerRef = useRef<any>();
    const mainRef = useRef<any>();

    // useEffect(() => {
    //     document.documentElement.addEventListener('scroll', () => {
    //         // setScrollTopValue(document.documentElement.scrollTop);
    //         console.log('scroll');
    //     });

    //     return () => {
    //         document.documentElement.removeEventListener('scroll', () => {
    //             setScrollTopValue(document.documentElement.scrollTop);
    //         });
    //     };
    // }, []);

    useEffect(() => {
        let timer: any = null;
        const handleScroll = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                setScrollTopValue(containerRef.current.getBoundingClientRect().top);
            }, 10);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')} ref={containerRef}>
                <HeaderComponent className={cx('header')} />
                <main className={cx('main')} ref={mainRef}>
                    {children}
                </main>
                <FooterComponent className={cx('footer')} />
            </div>
            <Outlet context={{ wrapperRef: containerRef, currentScroll: scrollTopValue }} />
        </div>
    );
};

export default DefaultLayout;
