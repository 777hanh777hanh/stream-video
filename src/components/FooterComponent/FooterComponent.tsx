import { useClassNames } from '~/hooks';
import styles from './FooterComponent.module.scss';

const FooterComponent = ({ className: customClassName }: { className: string }) => {
    const cx = useClassNames(styles);
    return (
        <div className={cx('footer', customClassName)}>
            <h3>copyright by 777hanh</h3>
        </div>
    );
};

export default FooterComponent;
