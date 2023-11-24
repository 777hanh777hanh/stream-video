import React from 'react';

import styles from './DefaultLayout.module.scss';
import { useClassNames } from '~/hooks';
import HeaderComponent from '~/components/HeaderComponent';
import FooterComponent from '~/components/FooterComponent';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    const cx = useClassNames(styles);
    return (
        <>
            <div className={cx('container')}>
                {/* <h1>Default Layout</h1> */}
                <HeaderComponent className={cx('header')} />
                <main className={cx('main')}>{children}</main>
                <FooterComponent className={cx('footer')} />
            </div>
        </>
    );
};

export default DefaultLayout;
