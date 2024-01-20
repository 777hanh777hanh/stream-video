import { FC, memo, useMemo } from 'react';

import { useClassNames } from '~/hooks';
import style from './WatchListItem.module.scss';
import Image from '~components/Image';
import { EyeIcon, PlayIcon2 } from '~/assets/icons';

interface WatchListItemProps {
    className?: string | { [key: string]: string | boolean | undefined };
    // data?: { [key: string]: string | string[] | number | null | undefined } | undefined;
    // index?: number | string;
    // imgSrc?: string | null | undefined;
    // title: string;
    // views?: string | number | undefined;
    // desc?: string;
}

const WatchListItem: FC<WatchListItemProps> = ({ className: cusClassName }) => {
    const cx = useMemo(() => useClassNames(style), []);

    return (
        <div className={cx('list__item', cusClassName || '')} tabIndex={0}>
            <div className={cx('list__item-index')}>1</div>
            <div className={cx('list__item-poster')}>
                <Image
                    className={cx('list__item-img')}
                    src="https://i.ytimg.com/vi/1La4QzGeaaQ/maxresdefault.jpg"
                    alt="Episode 1"
                />
                <div className={cx('list__item-play-icon')}>
                    <PlayIcon2 className={cx('list__item-icon')} />
                </div>
            </div>
            <div className={cx('list__item-info')}>
                <div className={cx('list__item-title')}>
                    <div className={cx('list__item-title-text')}>Episode 1</div>
                    <div className={cx('list__item-views')}>
                        1000 <EyeIcon />
                    </div>
                </div>
                <div className={cx('list__item-desc', 'line-clamp', 'line-clamp-4')}>
                    Excepteur non dolor consectetur pariatur aliqua sunt Lorem quis laborum voluptate Lorem ea
                    voluptate. Tempor velit elit exercitation qui duis aute. Do fugiat incididunt culpa irure.
                    Dolor ad tempor laborum ea. Excepteur non dolor consectetur pariatur aliqua sunt Lorem
                    quis laborum voluptate Lorem ea voluptate. Tempor velit elit exercitation qui duis aute.
                    Do fugiat incididunt culpa irure. Dolor ad tempor laborum ea.
                </div>
            </div>
        </div>
    );
};

export default memo(WatchListItem);
