import { Link } from 'react-router-dom';
import { useMemo } from 'react';

import { useClassNames } from '~/hooks';
import style from './ListVideo.module.scss';
import Slider, { SliderItem } from '~components/Slider';
import VideoItem from './VideoItem';

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
                <Slider>
                    {data.videos.map((video: any, key: any) => {
                        // Hover to show video modal list
                        return (
                            <SliderItem key={key}>
                                <VideoItem data={video} />
                            </SliderItem>
                        );
                    })}
                </Slider>
            </div>
        </section>
    );
};

export default ListVideo;
