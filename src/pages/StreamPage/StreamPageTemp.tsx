import { useMemo, FC, useState, useEffect, useCallback, useRef } from 'react';

import { useClassNames } from '~/hooks';
import style from './StreamPageTemp.module.scss';
import { navigationUtils } from '~/utils';

// video
import Button from '~/components/Button';
import { AlignToRightIcon, BackIcon, HeartIcon, HomeIcon, MenuIcon } from '~/assets/icons';
import * as infoVideoService from '~/services/infoVideoService';
import StreamListVideo from './StreamListVideo';
import { handlePathname } from '~/utils';
import { useNavigate } from 'react-router-dom';
import { routes } from '~/routes';

interface StreamPageTempProps {
    className?: string;
    data?: any;
}

const StreamPageTemp: FC<StreamPageTempProps> = () => {
    const cx = useMemo(() => useClassNames(style), []);

    const navigate = useNavigate();

    const [isCollapse, setIsCollapse] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [videoData, setVideoData] = useState<any>({});
    const [currentSlugVideo, setCurrentSlugVideo] = useState('');
    const [iframeSrc, setIframeSrc] = useState(null);

    const iframeRef = useRef(null);
    const listVideoRef = useRef(null);

    const goBack = navigationUtils.goBackPublic();

    const handleGoBack = (e: { preventDefault: () => void; stopPropagation: () => void }) => {
        e.preventDefault();
        e.stopPropagation();
        goBack(getSlugOfVideo());
    };

    const handleGoHome = () => {
        navigate(routes.home);
    };

    // Fetch Video Data
    useEffect(() => {
        const infoVideo = async () => {
            // setIsLoading(true);
            if (currentSlugVideo) {
                try {
                    const response = await infoVideoService.infoVideo(currentSlugVideo);
                    setVideoData(response.video);
                    // setIsLoading(false);
                } catch (error) {
                    // setIsLoading(false);
                }
            }
        };

        infoVideo();
    }, [currentSlugVideo]);

    useEffect(() => {
        setIframeSrc(handleGetLinkVideo);
    }, [videoData]);

    // Get current slug video
    useEffect(() => {
        const videoSlug = getSlugOfVideo();
        if (videoSlug) {
            setCurrentSlugVideo(videoSlug);
        }
    }, []);

    // Function handle Format Slug of video
    const getSlugOfVideo = () => {
        const l = window.location;
        let p = l.pathname;
        if (p.endsWith('/')) {
            p = p.substring(0, p.length - 1);
        }
        return p.split('/').pop();
    };

    const handleRedirectToVideo = useCallback((videoSlug: string, currentSlug: string) => {
        setIframeSrc(null);
        if (videoSlug !== currentSlug) {
            const pathStream = handlePathname.streamPath(videoSlug);
            navigate(pathStream, { replace: true });

            setCurrentSlugVideo(videoSlug);
        }
    }, []);

    const handleCollapse = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setIsCollapse(!isCollapse);

        if (listVideoRef.current) {
            (listVideoRef.current as HTMLElement).style.width = isCollapse ? '' : '0';
            (listVideoRef.current as HTMLElement).style.paddingLeft = isCollapse ? '' : '0';
            (listVideoRef.current as HTMLElement).style.paddingRight = isCollapse ? '' : '0';
            (listVideoRef.current as HTMLElement).style.marginLeft = isCollapse ? '' : '0';
        }
    };

    const handleSaveVideo = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    const handleGetLinkVideo = useMemo(() => {
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
                                        {iframeSrc && (
                                            <iframe
                                                className={cx('video__player', 'video__player--iframe')}
                                                src={iframeSrc}
                                                frameBorder={0}
                                                ref={iframeRef}
                                            ></iframe>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* List video */}
                        <StreamListVideo
                            videoTagsSlug={videoData?.tags}
                            videoSlug={currentSlugVideo}
                            onRedirectVideo={handleRedirectToVideo}
                            ref={listVideoRef}
                        />
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

                        <div className={cx('stream__home')} onClick={handleGoHome}>
                            <HomeIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StreamPageTemp;
