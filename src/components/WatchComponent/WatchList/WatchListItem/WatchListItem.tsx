import { FC, memo, useLayoutEffect, useMemo, useState } from 'react';

import { useClassNames } from '~/hooks';
import style from './WatchListItem.module.scss';
import Image from '~components/Image';
import { EyeIcon, PlayIcon2 } from '~/assets/icons';

interface WatchListItemProps {
    className?: string | { [key: string]: string | boolean | undefined };
    data?: { [key: string]: string | string[] | number | null | undefined } | undefined;
    index?: number;
}

const WatchListItem: FC<WatchListItemProps> = ({ className: cusClassName, data, index }) => {
    const cx = useMemo(() => useClassNames(style), []);
    const [isTarget, setIsTarget] = useState(false);

    const handleStreamVideo = () => {
        alert('Stream video: ' + data?.slug);
    };

    useLayoutEffect(() => {
        const checkIsCurrentVideo = () => {
            const l = window.location.pathname;
            const s: string = (data?.slug && data?.slug.toString().replace(/\//g, ''))?.toString() || '';
            const pathnameArr = (l.endsWith('/') && l.slice(0, -1).split('/')) || l.split('/');
            const pathnameSplit = pathnameArr[pathnameArr.length - 1];
            if (s === pathnameSplit) setIsTarget(true);
        };

        checkIsCurrentVideo();
    });

    return (
        <div
            className={cx('list__item', cusClassName || '', { active: isTarget })}
            tabIndex={0}
            onClick={handleStreamVideo}
        >
            <div className={cx('list__item-index')}>{`${typeof index === 'number' && index + 1}`}</div>
            <div className={cx('list__item-poster')}>
                <div className={cx('list__item-poster-wrapper')}>
                    <Image
                        className={cx('list__item-img-bg')}
                        src={data?.poster || data?.thumbnail}
                        alt={data?.title}
                    />
                    <Image className={cx('list__item-img')} src={data?.thumbnail} alt={data?.title} />
                    <div className={cx('list__item-play-icon')}>
                        <PlayIcon2 className={cx('list__item-icon')} />
                    </div>
                </div>
            </div>
            <div className={cx('list__item-info')}>
                <div className={cx('list__item-title')}>
                    <div className={cx('list__item-title-text')}>{data?.title}</div>
                    <div className={cx('list__item-views')}>
                        {data?.views} <EyeIcon />
                    </div>
                </div>
                <div className={cx('list__item-desc', 'line-clamp', 'line-clamp-4')}>{data?.synopsis}</div>
            </div>
        </div>
    );
};

export default memo(WatchListItem);
