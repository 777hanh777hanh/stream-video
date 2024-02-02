import { forwardRef, memo, useEffect, useMemo, useState } from 'react';
import { useClassNames } from '~/hooks';
import style from './StreamListVideo.module.scss';
import Image from '~/components/Image';

import * as termService from '~/services/termService';
import * as infoVideoService from '~/services/infoVideoService';

interface StreamListVideoProps {
    className?: string;
    videoTagsSlug?: { [key: string]: any } | string;
    videoSlug?: string;
    onRedirectVideo?: Function;
}

const StreamListVideo = forwardRef(
    ({ videoTagsSlug, videoSlug, onRedirectVideo }: StreamListVideoProps, ref: React.Ref<HTMLDivElement>) => {
        const cx = useMemo(() => useClassNames(style), []);
        const [listVideoData, setListVideoData] = useState([]);

        useEffect(() => {
            const fetchListVideoByTagSlug = async () => {
                if (videoTagsSlug && videoTagsSlug.length > 0) {
                    // set loading true ...
                    try {
                        const checkIsTag = await termService.getTermByTagSlug(videoTagsSlug[0].slug);
                        if (checkIsTag.id) {
                            const res = await infoVideoService.searchListVideo({
                                tags: videoTagsSlug[0].slug,
                            });
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

        const sortListVideo = useMemo(() => {
            const handleDate = (str: string) => {
                if (str) {
                    const year = parseInt(str.substring(0, 4), 10);
                    const month = parseInt(str.substring(4, 6), 10) - 1; // Tháng trong JavaScript bắt đầu từ 0
                    const day = parseInt(str.substring(6, 8), 10);
                    const hours = parseInt(str.substring(9, 11), 10);
                    const minutes = parseInt(str.substring(11, 13), 10);
                    const seconds = parseInt(str.substring(13, 15), 10);
                    return new Date(year, month, day, hours, minutes, seconds).getTime();
                }
                return new Date().getTime();
            };

            if (listVideoData && listVideoData.length > 0) {
                return listVideoData.sort((a: { [key: string]: any }, b: { [key: string]: any }) => {
                    return handleDate(a.createdAt) - handleDate(b.createdAt);
                });
            }
        }, [listVideoData]);

        const handleRedirectToVideo = (e, slug, callback) => {
            e.preventDefault();
            e.stopPropagation();

            if (callback) {
                callback(slug, videoSlug);
            }
        };

        const formatVideoSlug = (videoSlug: string | undefined) => {
            if (videoSlug) {
                let newSlug = videoSlug;
                if (newSlug.endsWith('/')) {
                    newSlug = newSlug.substring(0, newSlug.length - 1);
                }
                return newSlug.split('/').pop();
            }
            return videoSlug;
        };

        const renderListVideo = () => {
            if (sortListVideo && sortListVideo.length > 0) {
                return sortListVideo.map((video: { [key: string]: any }, index) => {
                    const isCurrentVideo = formatVideoSlug(videoSlug) === formatVideoSlug(video.slug);

                    return (
                        <div
                            key={video.id || index}
                            className={cx('stream__list-item', {
                                'stream__list-item--active': isCurrentVideo,
                            })}
                            onClick={(e) => {
                                handleRedirectToVideo(e, video.slug, onRedirectVideo);
                            }}
                        >
                            {/* Index */}
                            <span className={cx('list-item__index')}>{index + 1}</span>

                            {/* Poster wrapper */}
                            <div className={cx('list-item__thumb-wrapper')}>
                                <Image
                                    src={video?.poster}
                                    alt={video?.title}
                                    className={cx('list-item__thumb-bg')}
                                />
                                <Image
                                    src={video?.thumbnail}
                                    alt={video?.title}
                                    className={cx('list-item__thumb-img')}
                                />
                            </div>

                            {/* Info */}
                            <div className={cx('list-item__info')}>
                                <h3 className={cx('list-item__title')}>{video?.title}</h3>
                            </div>
                        </div>
                    );
                });
            }
        };

        return (
            <div className={cx('stream__list')} ref={ref}>
                {renderListVideo()}
            </div>
        );
    },
);

export default memo(StreamListVideo);
