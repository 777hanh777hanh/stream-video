import { useClassNames } from '~/hooks';
import styles from './SearchVideoItem.module.scss';
import Image from '~components/Image';

const SearchVideoItem = ({ className }: any) => {
    const cx = useClassNames(styles);
    return (
        <div className={cx('wrapper', className)}>
            <Image
                className={cx('thumbnail')}
                src="https://irex.cc/images/thumb/1LDK-JK-Ikinari-Doukyo-Micchaku-Hatsu-Ecchi-1.jpg"
                alt=""
            />
            <h4 className={cx('title')}>1LDK + JK Ikinari Doukyo Micchaku Hatsu Ecchi 1</h4>
        </div>
    );
};

export default SearchVideoItem;
