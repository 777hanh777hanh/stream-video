import { memo, useMemo, useEffect, useState, useRef } from 'react';
// import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

import { useClassNames } from '~/hooks';
import style from './WatchComponent.module.scss';
// import { routes } from '~/routes';
import Image from '~components/Image';
import { CloseIcon, HeartIcon, PlayIcon, PlusIcon } from '~/assets/icons';
import Button from '../Button';
import WatchDetail from './WatchDetail';
import WatchList from './WatchList';
import WatchListCard from './WatchListCard';

const WatchComponent = () => {
    const cx = useMemo(() => useClassNames(style), []);

    const [_isShow, setIsShow] = useState(false);

    // const overlayRef = useRef<any>();
    const backDropRef = useRef<any>();

    const { wrapperRef, currentScroll } = useOutletContext<any>();
    const currentScrollValue = useMemo(() => currentScroll, []);

    // const navigate = useNavigate();

    const navigateToHomePage = useMemo(
        () => () => {
            // setIsShow(false);
            // backDropRef.current.style.opacity = ``;
            // backDropRef.current.style.visibility = ``;
            //
            // overlayRef.current.addEventListener(
            //     'transitionend',
            //     () => {
            //         wrapperRef.current.removeAttribute('style');
            //         wrapperRef.current.style.position = 'static';
            //         wrapperRef.current.removeAttribute('tabindex');
            //         wrapperRef.current.style.zIndex = ``;
            //
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

        setTimeout(() => {
            setIsShow(true);
            backDropRef.current.style.opacity = `1`;
            backDropRef.current.style.visibility = `visible`;

            // scroll to top
            window.scrollTo(0, 0);
        }, 10);

        return () => {};
    }, []);

    const demoDataDetailNeed = {
        title: 'This is Title',
        views: '1000 views',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, adipisci architecto atque autem blanditiis consequatur cumque cupiditate deserunt doloribus ducimus ea, earum eligendi error esse est et, exercitationem explicabo facere fugiat fugit hic id illum impedit in incidunt ipsa iste iure labore laboriosam laborum magnam magni maiores maxime minima molestiae mollitia natus necessitatibus nemo neque nisi nobis nostrum nulla numquam obcaecati officia officiis omnis pariatur perferendis perspiciatis placeat quae quam quas quia quibusdam quidem quisquam quod quos ratione reiciendis rem repellat repellendus reprehenderit repudiandae rerum saepe sapiente sequi similique sint sit soluta sunt suscipit tempora tempore tenetur totam ullam unde vel veniam vero vitae voluptas voluptate voluptatem voluptates voluptatibus voluptatum.',
        alternativeTitles: ['Another Title', 'Another Title 2'],
        genres: ['Big Boob', 'Ahegao', 'Fantasy', 'Romance', 'Vanilla', 'Loli'],
        tags: ['Another Title', 'Another Title 2'],
        studios: 'Manjin',
        release: 2023,
    };

    const demoDataListNeed = {};

    // const demoDataSections = useCallback(() => {
    //     return [
    //         {
    //             title: 'Title 1',
    //             videos: [],
    //         },
    //         {
    //             title: 'Title 2',
    //             term: {
    //                 id: 102,
    //                 name: 'Name of term',
    //             },
    //             videos: [
    //                 {
    //                     title: 'Video title 1',
    //                     synopsis: 'Video DESCRIPTION',
    //                     thumbnail: 'https://i.pinimg.com/736x/63/23/f6/6323f60bf136b3e6e1b859ad36f6a87e.jpg',
    //                 },
    //                 {
    //                     title: 'Video title 2',
    //                     synopsis: 'Video DESCRIPTION 2',
    //                     thumbnail: 'https://i.pinimg.com/736x/63/23/f6/6323f60bf136b3e6e1b859ad36f6a87e.jpg',
    //                 },
    //                 {
    //                     title: 'Video title 3',
    //                     synopsis: 'Video DESCRIPTION 4',
    //                     thumbnail: 'https://i.pinimg.com/736x/63/23/f6/6323f60bf136b3e6e1b859ad36f6a87e.jpg',
    //                 },
    //                 {
    //                     title: 'Video title 4',
    //                     synopsis: 'Video DESCRIPTION 4',
    //                     thumbnail: 'https://i.pinimg.com/736x/63/23/f6/6323f60bf136b3e6e1b859ad36f6a87e.jpg',
    //                 },
    //             ],
    //         },
    //     ];
    // }, []);

    const demoSection = useMemo(() => {
        return {
            title: 'Title 2',
            term: {
                id: 102,
                name: 'Name of term',
            },
            videos: [
                {
                    id: 1,
                    title: 'Video title 1',
                    synopsis: 'Video DESCRIPTION',
                    thumbnail: 'https://i.pinimg.com/736x/63/23/f6/6323f60bf136b3e6e1b859ad36f6a87e.jpg',
                    views: 10000,
                },
                {
                    id: 2,
                    title: 'Video title 2',
                    synopsis: 'Video DESCRIPTION 2',
                    thumbnail: 'https://i.pinimg.com/736x/63/23/f6/6323f60bf136b3e6e1b859ad36f6a87e.jpg',
                    views: 10000,
                },
                {
                    id: 3,
                    title: 'Video title 3',
                    // synopsis: 'Video DESCRIPTION 3',
                    thumbnail: 'https://i.pinimg.com/736x/63/23/f6/6323f60bf136b3e6e1b859ad36f6a87e.jpg',
                    views: 10000,
                },
                {
                    id: 4,
                    title: 'Video title 4',
                    synopsis: 'Video DESCRIPTION 4',
                    thumbnail: 'https://i.pinimg.com/736x/63/23/f6/6323f60bf136b3e6e1b859ad36f6a87e.jpg',
                    views: 10000,
                },
            ],
        };
    }, []);

    const demoSectionLiked = useMemo(() => {
        return { videos: [1, 4] };
    }, []);

    return (
        <div className={cx('watch')} tabIndex={1}>
            {/* <div className={cx('overlay', { show: isShow })} ref={overlayRef} onClick={navigateToHomePage}> */}

            {/* Container */}
            <div className={cx('container')}>
                {/* Thumbnail */}
                <div className={cx('thumb')}>
                    <Image
                        className={cx('img')}
                        src="https://i.ytimg.com/vi/1La4QzGeaaQ/maxresdefault.jpg"
                        alt="thumb"
                    />
                    <Image
                        className={cx('img__background')}
                        src="https://i.ytimg.com/vi/1La4QzGeaaQ/maxresdefault.jpg"
                        alt="thumb"
                    />
                    <div className={cx('thumb__details')}>
                        {/* cta */}
                        <div className={cx('thumb__cta')}>
                            <Button btn className={cx('thumb__cta-item')} icon={<PlayIcon />}>
                                <span className={cx('thumb__cta-text')}>Play</span>
                            </Button>
                            <Button btn circle className={cx('thumb__cta-item', 'thumb__cta-item--circle')}>
                                <span className={cx('thumb__cta-icon')}>
                                    <PlusIcon />
                                </span>
                            </Button>
                            <Button btn circle className={cx('thumb__cta-item', 'thumb__cta-item--circle')}>
                                <span className={cx('thumb__cta-icon')}>
                                    <HeartIcon className={cx('thumb__cta-icon')} />
                                </span>
                            </Button>
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
                    <WatchDetail data={demoDataDetailNeed} />

                    {/* list */}
                    <WatchList data={demoDataListNeed} />

                    {/* recommend */}
                    <WatchListCard data={demoSection} dataLiked={demoSectionLiked} />
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
    );
};

export default memo(WatchComponent);
