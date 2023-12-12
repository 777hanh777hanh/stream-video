import { Link } from 'react-router-dom';
// import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import { useClassNames } from '~/hooks';
import style from './ListVideo.module.scss';
import VideoItem from './VideoItem';

const ListVideo = ({ data, className: customClassName, ...props }) => {
    const cx = useClassNames(style);
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
                {data.videos.map((video: any) => {
                    // Hover to show video modal list
                    return <VideoItem key={video.id} data={video} />;
                })}
            </div>
        </section>
    );
};

export default ListVideo;
