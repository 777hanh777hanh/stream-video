import { useClassNames } from '~/hooks';
import styles from './SearchVideoItem.module.scss';
import Image from '~components/Image';
import { Link } from 'react-router-dom';

const SearchVideoItem = ({ className, data }: any) => {
    const cx = useClassNames(styles);
    return (
        <Link to={`/watch${data.slug}`} className={cx('wrapper', className)}>
            <Image
                className={cx('thumbnail')}
                src={
                    data?.thumbnail ||
                    'https://irex.cc/images/thumb/1LDK-JK-Ikinari-Doukyo-Micchaku-Hatsu-Ecchi-1.jpg'
                }
                alt={data?.title || ''}
            />
            <h4 className={cx('title')}>
                {data?.title || `1LDK + JK Ikinari Doukyo Micchaku Hatsu Ecchi 1`}
            </h4>
        </Link>
    );
};

export default SearchVideoItem;
