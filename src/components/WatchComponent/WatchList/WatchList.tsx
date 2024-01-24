import { FC, memo, useEffect, useMemo, useState } from 'react';

import { useClassNames } from '~/hooks';
import style from './WatchList.module.scss';
import WatchListItem from './WatchListItem';
import * as termService from '~/services/termService';
import * as infoVideoService from '~/services/infoVideoService';

interface WatchListProps {
    className?: string | { [key: string]: string | boolean | undefined };
    data?: { [key: string]: string | string[] | number | null | undefined } | undefined;
    videoTagsSlug?: { [key: string]: string }[] | undefined;
    videos?: { [key: string]: any };
}

const WatchList: FC<WatchListProps> = ({ className: cusClassName, videoTagsSlug }) => {
    const cx = useMemo(() => useClassNames(style), []);
    const classes = cx('wrapper', cusClassName || '');

    const [listVideoData, setListVideoData] = useState([]);

    useEffect(() => {
        const fetchListVideoByTagSlug = async () => {
            if (videoTagsSlug && videoTagsSlug.length > 0) {
                // set loading true ...
                try {
                    const checkIsTag = await termService.getTermByTagSlug(videoTagsSlug[0].slug);
                    if (checkIsTag.id) {
                        const res = await infoVideoService.searchListVideo({ tags: videoTagsSlug[0].slug });
                        setListVideoData(res.videos.reverse());
                    }

                    // set loading false ...
                } catch (error) {
                    try {
                        if (videoTagsSlug && videoTagsSlug.length > 1) {
                            const checkIsTag = await termService.getTermByTagSlug(videoTagsSlug[1].slug);
                            if (checkIsTag.id) {
                                const res = await infoVideoService.searchListVideo({
                                    tags: videoTagsSlug[1].slug,
                                });
                                setListVideoData(res.videos.reverse());
                            }

                            // set loading false ...
                        }
                    } catch (error) {
                        // set Loading false ...
                    }
                }
            }
        };

        fetchListVideoByTagSlug();
    }, [videoTagsSlug]);

    return (
        <>
            {listVideoData && listVideoData.length > 1 && (
                <div className={classes}>
                    <div className={cx('list')}>
                        <div className="list__header">
                            <div className={cx('list__title')}>Episode List</div>
                        </div>
                        <div className={cx('list__container')}>
                            {listVideoData &&
                                listVideoData.map((video, index) => {
                                    return <WatchListItem key={index} index={index} data={video} />;
                                })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default memo(WatchList);
