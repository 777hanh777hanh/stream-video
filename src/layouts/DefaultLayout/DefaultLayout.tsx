import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './DefaultLayout.module.scss';
import { useClassNames } from '~/hooks';
import HeaderComponent from '~/components/HeaderComponent';
import FooterComponent from '~/components/FooterComponent';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    const cx = useClassNames(styles);

    const [scrollTopValue, setScrollTopValue] = React.useState<any>(0);
    const containerRef = useRef<any>();

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setScrollTopValue(document.documentElement.scrollTop);
        });
        return () => {
            window.removeEventListener('scroll', () => {
                setScrollTopValue(document.documentElement.scrollTop);
            });
        };
    }, []);

    return (
        <>
            <div className={cx('container')} ref={containerRef}>
                <div>
                    <HeaderComponent className={cx('header')} />
                    <main className={cx('main')}>{children}</main>
                    <FooterComponent className={cx('footer')} />
                </div>
            </div>
            <Outlet context={{ wrapperRef: containerRef, currentScroll: scrollTopValue }} />
        </>
    );
};

export default DefaultLayout;
