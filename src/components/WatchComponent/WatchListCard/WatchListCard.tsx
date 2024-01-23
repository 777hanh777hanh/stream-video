import { FC, memo, useEffect, useMemo, useState } from 'react';

import style from './WatchListCard.module.scss';
import { useClassNames } from '~/hooks';
import { ChevronDownIcon } from '~/assets/icons';
import ChevronUpIcon from '~/assets/icons/chevronUp';
import WatchListCardItem from './WatchListCardItem';

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
                        // Check video is Liked
                        if (dataLiked?.videos?.length > 0) {
                            dataLiked?.videos?.includes(video.id) && (video.isLiked = true);
                        }

                        return <WatchListCardItem key={index} video={video} />;
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
