import { useClassNames } from '~/hooks';
import styles from './MenuComponent.module.scss';

const MenuComponent = () => {
    const cx = useClassNames(styles);

    return (
        <>
            <div className={cx('heading')}>Menu Component</div>
        </>
    );
};

export default MenuComponent;
