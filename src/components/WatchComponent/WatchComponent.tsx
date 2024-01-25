import { memo, useMemo, useEffect, useState, useRef } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

import { useClassNames } from '~/hooks';
import style from './WatchComponent.module.scss';
import { handlePathname } from '~/utils';
import Image from '~components/Image';
import { CloseIcon, PlayIcon, PlusIcon } from '~/assets/icons';
import Button from '../Button';
import WatchDetail from './WatchDetail';
import WatchList from './WatchList';
import WatchListCard from './WatchListCard';
import * as infoVideoService from '~/services/infoVideoService';

const WatchComponent = () => {
    const cx = useMemo(() => useClassNames(style), []);

    const [_isShow, setIsShow] = useState(false);
    const [videoData, setVideoData] = useState<any>({});
    // const [isLoading, setIsLoading] = useState(false);

    // const overlayRef = useRef<any>();
    const backDropRef = useRef<any>();

    const { wrapperRef, currentScroll } = useOutletContext<any>();
    const currentScrollValue = useMemo(() => currentScroll, []);

    const navigate = useNavigate();

    // fetch API
    useEffect(() => {
        const infoVideo = async () => {
            function getVideoSlugFromPathname() {
                const pathnameSplit = window.location.pathname.split('/');
                let videoSlug = '';
                if (pathnameSplit[pathnameSplit.length - 1] === '') {
                    videoSlug = pathnameSplit[pathnameSplit.length - 2]
                        ? pathnameSplit[pathnameSplit.length - 2]
                        : '';
                } else {
                    videoSlug = pathnameSplit[pathnameSplit.length - 1]
                        ? pathnameSplit[pathnameSplit.length - 1]
                        : '';
                }

                return videoSlug;
            }

            const videoSlug = getVideoSlugFromPathname();

            // setIsLoading(true);
            try {
                const response = await infoVideoService.infoVideo(videoSlug);
                setVideoData(response);

                // setIsLoading(false);
            } catch (error) {
                // setIsLoading(false);
            }
        };

        infoVideo();
    }, []);

    const navigateToHomePage = useMemo(
        () => () => {
            // setIsShow(false);
            // backDropRef.current.style.opacity = ``;
            // backDropRef.current.style.visibility = ``;

            // overlayRef.current.addEventListener(
            //     'transitionend',
            //     () => {
            //         wrapperRef.current.removeAttribute('style');
            //         wrapperRef.current.style.position = 'static';
            //         wrapperRef.current.removeAttribute('tabindex');
            //         wrapperRef.current.style.zIndex = ``;

            //         window.scrollTo(0, -currentScrollValue);
            //         navigate(routes.home);
            //     },
            //     { once: true },
            // );

            const pathNameToNavigate = () => {
                const currentPathname = window.location.pathname;
                let newPathname = currentPathname.split('/');
                return slicePathname(newPathname).join('/');
            };

            const slicePathname = (pathname: string[]) => {
                const pathnameSliced = pathname.slice(0, -1);
                if (pathnameSliced.includes('watch')) {
                    return slicePathname(pathnameSliced);
                }
                return pathnameSliced;
            };

            alert('return to ' + (pathNameToNavigate() || '/'));
        },
        [],
    );

    useEffect(() => {
        wrapperRef.current.setAttribute('tabindex', '-1');

        wrapperRef.current.style.position = 'fixed';
        wrapperRef.current.style.top = `${currentScrollValue}px`;
        wrapperRef.current.style.zIndex = `0`;

        let timer: any = undefined;
        timer = setTimeout(() => {
            clearTimeout(timer);
            setIsShow(true);
            if (backDropRef.current) {
                backDropRef.current.style.opacity = `1`;
                backDropRef.current.style.visibility = `visible`;
            }

            // scroll to top
            window.scrollTo(0, 0);
        }, 10);

        return () => {};
    }, [backDropRef.current]);

    const demoSectionLiked = useMemo(() => {
        return { videos: [1, 4] };
    }, []);

    const handleDispatchLikeVideo = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        alert('dispatch like video: ' + videoData?.video?.id);
    };

    const handleStreamVideo = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        const pathStream = handlePathname.streamPath(videoData?.video?.slug);
        navigate(pathStream);
    };

    return (
        <>
            <div className={cx('watch')} tabIndex={1}>
                {/* <div className={cx('overlay', { show: isShow })} ref={overlayRef} onClick={navigateToHomePage}> */}

                {/* Container */}
                <div className={cx('container')}>
                    {/* Thumbnail */}
                    <div className={cx('thumb')}>
                        <Image className={cx('img')} src={videoData?.video?.thumbnail} alt="thumb" />
                        <Image
                            className={cx('img__background')}
                            src={videoData?.video?.poster || videoData?.video?.thumbnail}
                            alt="thumb"
                        />
                        <div className={cx('thumb__details')}>
                            {/* cta */}
                            <div className={cx('thumb__cta')}>
                                <Button
                                    btn
                                    className={cx('thumb__cta-item')}
                                    icon={<PlayIcon />}
                                    onClick={handleStreamVideo}
                                >
                                    <span className={cx('thumb__cta-text')}>Play</span>
                                </Button>
                                <Button
                                    btn
                                    circle
                                    className={cx('thumb__cta-item', 'thumb__cta-item--circle')}
                                    onClick={handleDispatchLikeVideo}
                                >
                                    <span className={cx('thumb__cta-icon')}>
                                        <PlusIcon />
                                    </span>
                                </Button>
                                {/* <Button
                                    btn
                                    circle
                                    className={cx('thumb__cta-item', 'thumb__cta-item--circle')}
                                >
                                    <span className={cx('thumb__cta-icon')}>
                                        <HeartIcon className={cx('thumb__cta-icon')} />
                                    </span>
                                </Button> */}
                            </div>
                        </div>
                    </div>

                    {/* Close icon*/}
                    <div className={cx('close')} onClick={navigateToHomePage}>
                        <CloseIcon className={cx('close__icon')} />
                    </div>

                    {/* Info */}
                    <div className={cx('info')}>
                        {/* details */}
                        <WatchDetail data={videoData?.video} />

                        {/* list */}
                        <WatchList videoTagsSlug={videoData?.video?.tags} />

                        {/* recommend */}
                        {videoData.sections?.map((section: any, index: number) => {
                            if (index !== 0)
                                return (
                                    <WatchListCard key={index} data={section} dataLiked={demoSectionLiked} />
                                );
                        })}

                        {/* notes */}
                        {videoData?.video?.notes && (
                            <div className={cx('notes')}>
                                <p className={cx('notes__text')}>
                                    <span className={cx('notes__text--span')}>Note: </span>
                                    {videoData.video.notes}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Back Drop */}
                <div
                    className={cx('backDrop')}
                    ref={backDropRef}
                    onClick={navigateToHomePage}
                    tabIndex={-1}
                ></div>
                {/* </div> */}
            </div>
        </>
    );
};

export default memo(WatchComponent);
