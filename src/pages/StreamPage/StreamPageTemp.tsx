import { useMemo, FC, useState, useEffect } from 'react';

import { useClassNames } from '~/hooks';
import style from './StreamPageTemp.module.scss';
import { navigationUtils } from '~/utils';

// video
import Button from '~/components/Button';
import { AlignToRightIcon, BackIcon, HeartIcon, MenuIcon } from '~/assets/icons';
import * as infoVideoService from '~/services/infoVideoService';

interface StreamPageTempProps {
    className?: string;
    data?: any;
}

const StreamPageTemp: FC<StreamPageTempProps> = () => {
    const cx = useMemo(() => useClassNames(style), []);

    const [isCollapse, setIsCollapse] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [videoData, setVideoData] = useState<any>({});

    const goBack = navigationUtils.goBackPublic();

    const handleGoBack = (e: { preventDefault: () => void; stopPropagation: () => void }) => {
        e.preventDefault();
        e.stopPropagation();
        goBack(getSlugOfVideo());
    };

    useEffect(() => {
        const infoVideo = async () => {
            const videoSlug = getSlugOfVideo();

            // setIsLoading(true);
            if (videoSlug) {
                try {
                    const response = await infoVideoService.infoVideo(videoSlug);
                    setVideoData(response.video);
                    // setIsLoading(false);
                } catch (error) {
                    // setIsLoading(false);
                }
            }
        };

        infoVideo();
    }, []);

    const getSlugOfVideo = () => {
        const l = window.location;
        let p = l.pathname;
        if (p.endsWith('/')) {
            p = p.substring(0, p.length - 1);
        }
        return p.split('/').pop();
    };

    const handleCollapse = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setIsCollapse(!isCollapse);
    };

    const handleSaveVideo = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    const handleGetLinkVideo = useMemo(() => {
        console.log(videoData.links);

        if (videoData?.links) {
            if (Array.isArray(videoData.links)) {
                return videoData.links[0];
            } else if (typeof videoData.links === 'string') {
                return videoData.links;
            }
        }
        return '';
    }, [videoData]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('stream')}>
                <div className={cx('stream__container')}>
                    <div className={cx('stream__view')}>
                        {/* Video wrapper*/}
                        <div id="stream__player" className={cx('stream__player')} tabIndex={0}>
                            <div className={cx('video')}>
                                <div className={cx('video__wrapper')}>
                                    <div className={cx('video__container')}>
                                        <iframe
                                            className={cx('video__player', 'video__player--iframe')}
                                            src={handleGetLinkVideo}
                                            frameBorder={0}
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* List video */}
                        <div className={cx('stream__list')}>
                            <div className={cx('stream__list-item')}>Video 1</div>
                            <div className={cx('stream__list-item')}>Video 2</div>
                            <div className={cx('stream__list-item')}>Video 3</div>
                            <div className={cx('stream__list-item')}>Video 4</div>
                        </div>
                    </div>

                    <div className={cx('stream__bottom')}>
                        {/* Stream title */}
                        <h2 className={cx('stream__title')}>{videoData?.title || ''}</h2>

                        {/* Stream CTA */}
                        <div className={cx('stream__cta')}>
                            <Button
                                btn
                                circle
                                type="button"
                                className={cx('stream__btn')}
                                onClick={handleGoBack}
                            >
                                {/* Back Icon */}
                                <BackIcon className={cx('stream__icon')} />
                            </Button>
                            <Button
                                btn
                                circle
                                type="button"
                                className={cx('stream__btn', { liked: isLiked })}
                                onClick={handleSaveVideo}
                            >
                                {/* Plus Icon */}
                                {/* if saved => color change */}
                                <HeartIcon className={cx('stream__icon')} />
                            </Button>
                            <Button
                                btn
                                circle
                                type="button"
                                className={cx('stream__btn')}
                                onClick={handleCollapse}
                            >
                                {/* if !isCollapse => Collapse Icon */}
                                {!isCollapse && <MenuIcon className={cx('stream__icon')} />}
                                {/* if isCollapse =>  Expend Icon */}
                                {isCollapse && <AlignToRightIcon className={cx('stream__icon')} />}
                            </Button>
                        </div>

                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StreamPageTemp;
