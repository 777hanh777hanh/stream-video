import { FC, memo, useMemo } from 'react';

import { useClassNames } from '~/hooks';
import style from './WatchList.module.scss';
import WatchListItem from './WatchListItem';

interface WatchListProps {
    className?: string | { [key: string]: string | boolean | undefined };
    data?: { [key: string]: string | string[] | number | null | undefined } | undefined;
    videos?: { [key: string]: any };
}

const WatchList: FC<WatchListProps> = ({ className: cusClassName }) => {
    const cx = useMemo(() => useClassNames(style), []);
    const classes = cx('wrapper', cusClassName || '');

    return (
        <div className={classes}>
            <div className={cx('list')}>
                <div className="list__header">
                    <div className={cx('list__title')}>Episode List</div>
                </div>
                <div className={cx('list__container')}>
                    <WatchListItem />
                    <WatchListItem />
                    <WatchListItem />
                    <WatchListItem />
                    <WatchListItem />
                </div>
            </div>
        </div>
    );
};

export default memo(WatchList);
