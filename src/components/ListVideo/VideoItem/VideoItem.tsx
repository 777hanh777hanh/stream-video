// import { Link } from 'react-router-dom';

import { useClassNames } from '~/hooks';
import style from './VideoItem.module.scss';
import Image from '~/components/Image';
// import Modal from '~/components/Modal';

const VideoItem = ({ data, ...passProps }) => {
    const cx = useClassNames(style);
    const props = { ...passProps };
    data.path = `/watch${data.slug}`;

    return (
        // <Modal data={data}>
        <div className={cx('video')} {...props}>
            <div className={cx('thumb')}>
                {/* <Link to={data.path}> */}
                <Image className={cx('img')} src={data.thumbnail} alt={data.title} />
                {/* </Link> */}
            </div>
            <div className={cx('info')}>
                <h3 className={cx('title')}>{data.title}</h3>
            </div>
        </div>
        // </Modal>
    );
};

export default VideoItem;
