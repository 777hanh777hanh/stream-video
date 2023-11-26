import React from 'react';

import styles from './LandingLayout.module.scss';
import { useClassNames } from '~/hooks';
import FooterComponent from '~/components/FooterComponent';

const LandingLayout = ({ children }: { children?: React.ReactNode }) => {
    const cx = useClassNames(styles);
    return (
        <>
            <div className={cx('container')}>
                <main className={cx('main')}>{children}</main>
                <FooterComponent className={'footer'} />
            </div>
        </>
    );
};

export default LandingLayout;
