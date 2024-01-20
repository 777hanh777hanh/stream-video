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

const WatchComponent = () => {
    const cx = useMemo(() => useClassNames(style), []);

    const [_isShow, setIsShow] = useState(false);

    // const overlayRef = useRef<any>();
    const backDropRef = useRef<any>();

    // const { wrapperRef, currentScroll } = useOutletContext<any>();
    const { wrapperRef } = useOutletContext<any>();

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
            //         window.scrollTo(0, currentScroll);
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
        const parentOffsetTop = wrapperRef.current.getBoundingClientRect().top;

        wrapperRef.current.style.position = 'fixed';
        wrapperRef.current.style.top = `${parentOffsetTop}px`;
        wrapperRef.current.style.zIndex = `0`;

        setTimeout(() => {
            setIsShow(true);
            backDropRef.current.style.opacity = `1`;
            backDropRef.current.style.visibility = `visible`;

            // scroll to top
            window.scrollTo(0, 0);
        }, 10);
    }, []);

    const demoData = {
        title: 'This is Title',
        views: '1000 views',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, adipisci architecto atque autem blanditiis consequatur cumque cupiditate deserunt doloribus ducimus ea, earum eligendi error esse est et, exercitationem explicabo facere fugiat fugit hic id illum impedit in incidunt ipsa iste iure labore laboriosam laborum magnam magni maiores maxime minima molestiae mollitia natus necessitatibus nemo neque nisi nobis nostrum nulla numquam obcaecati officia officiis omnis pariatur perferendis perspiciatis placeat quae quam quas quia quibusdam quidem quisquam quod quos ratione reiciendis rem repellat repellendus reprehenderit repudiandae rerum saepe sapiente sequi similique sint sit soluta sunt suscipit tempora tempore tenetur totam ullam unde vel veniam vero vitae voluptas voluptate voluptatem voluptates voluptatibus voluptatum.',
        alternativeTitles: ['Another Title', 'Another Title 2'],
        genres: ['Big Boob', 'Ahegao', 'Fantasy', 'Romance', 'Vanilla', 'Loli'],
        tags: ['Another Title', 'Another Title 2'],
        studios: 'Manjin',
        release: 2023,
    };

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
                    <WatchDetail data={demoData} />

                    {/* list */}
                    <div className={cx('wrapper')}>
                        <div className={cx('list')}>
                            <div className={cx('list__title')}>Episode List</div>
                            <div className={cx('list__item')}>
                                <div className={cx('list__item-index')}>1</div>
                                <div className={cx('list__item-poster')}>
                                    <Image
                                        className={cx('list__item-img')}
                                        src="https://i.ytimg.com/vi/1La4QzGeaaQ/maxresdefault.jpg"
                                        alt="thumb"
                                    />
                                </div>
                                <div className={cx('list__item-title')}>Episode 1</div>
                                <div className={cx('list__item-duration')}>10:00</div>
                            </div>
                        </div>
                    </div>

                    {/* recommend */}
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
