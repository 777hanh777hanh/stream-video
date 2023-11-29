import { useClassNames } from '~/hooks';
import styles from './Proper.module.scss';

const Wrapper = ({ children, className }: any) => {
    const cx = useClassNames(styles);

    return <div className={cx('wrapper', className)}>{children}</div>;
};

export default Wrapper;
