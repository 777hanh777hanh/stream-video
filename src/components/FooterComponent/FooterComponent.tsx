import { forwardRef } from 'react';

import { useClassNames } from '~/hooks';
import styles from './FooterComponent.module.scss';

const FooterComponent = ({ className: customClassName }: { className: string }, ref: any) => {
    const cx = useClassNames(styles);
    return (
        <footer className={cx('footer', customClassName)} ref={ref}>
            <h3 className={cx('copyright')}>copyright &copy; by 777hanh</h3>
        </footer>
    );
};

export default forwardRef(FooterComponent);
