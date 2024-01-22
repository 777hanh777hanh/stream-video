import { FC, memo, useEffect, useMemo, useState } from 'react';

import style from './WatchListCard.module.scss';
import { useClassNames } from '~/hooks';
import Image from '~/components/Image';
import { EyeIcon, PlayIcon2 } from '~/assets/icons';

interface WatchListCardProps {
    className?: any;
    data?: any;
}

const WatchListCard: FC<WatchListCardProps> = ({ className: cusClassName, data }) => {
    const cx = useMemo(() => useClassNames(style), []);
    const classes = useMemo(() => cx('wrapper', { [cusClassName]: cusClassName }), []);
    const [isCollapse, setIsCollapse] = useState<boolean>(true);

    useEffect(() => {
        if (data?.videos?.length > 3) {
            setIsCollapse(true);
        }
    }, [data?.videos]);

    const handleCollapse = () => {
        setIsCollapse(!isCollapse);
    };

    return (
        <div className={classes}>
            <div className={cx('list-card')}>
                <p className={cx('list-card__header')}>
                    {`${data?.title}`} {data?.term ? ` - ${data.term.name}` : ''}
                </p>
                <div className={cx('list-card__container', { 'list-card__container--collapse': isCollapse })}>
                    {/* Items */}
                    {data?.videos.map((video: any, index: number) => {
                        return (
                            <div key={index} className={cx('card-item')}>
                                <div className={cx('card-item__thumbnail')}>
                                    <Image
                                        className={cx('card-item__img-bg')}
                                        alt={video.title ?? ''}
                                        src={`${video.thumbnail}`}
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
                                        <h4 className={cx('card-item__title')}>{video.title ?? ''}</h4>
                                        <p className={cx('card-item__views')}>
                                            {video.views ?? ''}{' '}
                                            <span className={cx('card-item__views-icon')}>
                                                <EyeIcon />
                                            </span>
                                        </p>
                                    </div>
                                    <p className={cx('card-item__desc')}>{video.synopsis ?? ''}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={cx('list-card__divider', { 'list-card__divider--collapse': isCollapse })}>
                    <button className={cx('list-card__divider-btn')} onClick={handleCollapse}>
                        {isCollapse ? <EyeIcon /> : <PlayIcon2 />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(WatchListCard);
