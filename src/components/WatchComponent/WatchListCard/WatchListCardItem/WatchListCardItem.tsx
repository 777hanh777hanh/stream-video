import { useMemo, memo, FC } from 'react';

import style from './WatchListCardItem.module.scss';
import { useClassNames } from '~/hooks';
import Image from '~/components/Image';
import { CheckedIcon, EyeIcon, PlayIcon2, PlusIcon } from '~/assets/icons';

interface WatchListCardItemProps {
    className?: string;
    video?: any;
}

const WatchListCardItem: FC<WatchListCardItemProps> = ({ className: cusClassName, video }) => {
    const cx = useMemo(() => useClassNames(style), []);
    const classes = useMemo(() => cx('wrapper', cusClassName || ''), []);

    const handleStreamVideo = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        alert('stream video: ' + video.slug.replace(/\//g, ''));
    };
    const handleDispatchLikeVideo = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        alert('dispatch like video: ' + video.id);
    };

    return (
        <div className={classes} onClick={handleStreamVideo}>
            <div className={cx('card-item')}>
                <div className={cx('card-item__thumbnail')}>
                    <Image
                        className={cx('card-item__img-bg')}
                        alt={video.title ?? ''}
                        src={`${video.poster || video.thumbnail}`}
                    />
                    <Image
                        className={cx('card-item__img')}
                        alt={video.title ?? ''}
                        src={`${video.thumbnail}`}
                    />
                    <div className={cx('card-item__play-icon')}>
                        <PlayIcon2 className={cx('card-item__icon')} />
                    </div>
                </div>
                <div className={cx('card-item__info')}>
                    <div className={cx('card-item__metaData')}>
                        <div className={cx('card-item__metaData-text')}>
                            <h4 className={cx('card-item__title')}>{video.title ?? ''}</h4>
                            <p className={cx('card-item__views')}>
                                {video.views ?? ''}{' '}
                                <span className={cx('card-item__views-icon')}>
                                    <EyeIcon />
                                </span>
                            </p>
                        </div>
                        <div
                            className={cx('card-item__metaData-Follow', { liked: video?.isLiked })}
                            onClick={handleDispatchLikeVideo}
                        >
                            {video?.isLiked ? <CheckedIcon /> : <PlusIcon />}
                        </div>
                    </div>
                    <p className={cx('card-item__desc', 'card-item__desc--line-clamp')}>
                        {video.synopsis ?? ''}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default memo(WatchListCardItem);
