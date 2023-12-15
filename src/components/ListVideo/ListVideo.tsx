import { Link } from 'react-router-dom';
import { useMemo } from 'react';

import { useClassNames } from '~/hooks';
import style from './ListVideo.module.scss';
import Slider from '~components/Slider';

const ListVideo = ({ data, className: customClassName, ...props }) => {
    const cx = useMemo(() => useClassNames(style), []);
    const passProps = { ...props };

    return (
        <section className={cx('list-videos', customClassName)} {...passProps}>
            <div className={cx('list-videos-cta')}>
                <h2 className={cx('title')}>{data.title}</h2>
                {/* Path correctly */}
                <Link to={data.to.path || '/'} className={cx('more-btn')}>
                    more
                </Link>
            </div>
            {/* Slider */}
            <div className={cx('list')}>
                <Slider data={data.videos} />
            </div>
        </section>
    );
};

export default ListVideo;
