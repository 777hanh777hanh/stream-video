import { FC, memo, useEffect, useMemo, useState } from 'react';

import style from './WatchListCard.module.scss';
import { useClassNames } from '~/hooks';
import Image from '~/components/Image';
import { CheckedIcon, ChevronDownIcon, EyeIcon, PlayIcon2, PlusIcon } from '~/assets/icons';
import ChevronUpIcon from '~/assets/icons/chevronUp';

interface WatchListCardProps {
    className?: any;
    data?: any;
    dataLiked?: any;
}

const WatchListCard: FC<WatchListCardProps> = ({ className: cusClassName, data, dataLiked }) => {
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
                        let isLiked = false;
                        {
                            if (dataLiked?.videos?.length > 0) {
                                dataLiked?.videos?.includes(video.id) && (isLiked = true);
                            }
                        }

                        return (
                            <div
                                key={index}
                                className={cx('card-item')}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    console.log('click-card');
                                }}
                            >
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
                                            className={cx('card-item__metaData-Follow', { liked: isLiked })}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                !isLiked && console.log('like');
                                            }}
                                        >
                                            {isLiked ? <CheckedIcon /> : <PlusIcon />}
                                        </div>
                                    </div>
                                    <p className={cx('card-item__desc')}>{video.synopsis ?? ''}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={cx('list-card__divider', { 'list-card__divider--collapse': isCollapse })}>
                    <button className={cx('list-card__divider-btn')} onClick={handleCollapse}>
                        {isCollapse ? <ChevronDownIcon /> : <ChevronUpIcon />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(WatchListCard);
