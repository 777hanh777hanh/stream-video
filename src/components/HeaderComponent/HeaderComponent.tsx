import { useClassNames } from '~/hooks';
import styles from './HeaderComponent.module.scss';

const HeaderComponent = ({ className: customClassName }: { className: string }) => {
    const cx = useClassNames(styles);
    return (
        <div className={cx('header', customClassName)}>
            <h3>Header here</h3>
        </div>
    );
};

export default HeaderComponent;
