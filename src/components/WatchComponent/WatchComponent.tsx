import { memo, useMemo, useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

import { useClassNames } from '~/hooks';
import style from './WatchComponent.module.scss';
import { routes } from '~/routes';
import Image from '~components/Image';

const WatchComponent = () => {
    const cx = useMemo(() => useClassNames(style), []);

    const [isShow, setIsShow] = useState(false);

    const overlayRef = useRef<any>();
    const backDropRef = useRef<any>();

    const { wrapperRef, currentScroll } = useOutletContext<any>();

    const navigate = useNavigate();

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
            // console.log(window.location.pathname.split('/').slice(0, -3));
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
                            <div className={cx('thumb__cta-item')}>
                                <span className={cx('thumb__cta-icon')}>+</span>
                                <span className={cx('thumb__cta-text')}>Play</span>
                            </div>
                            <div className={cx('thumb__cta-item')}>
                                <span className={cx('thumb__cta-icon')}>Add</span>
                            </div>
                            <div className={cx('thumb__cta-item')}>
                                <span className={cx('thumb__cta-icon')}>Like</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Close icon*/}
                <div className={cx('close')} onClick={navigateToHomePage}>
                    <span className={cx('close__icon')}>X</span>
                </div>

                {/* Info */}
                <div className={cx('info')}>
                    {/* details */}
                    <div className={cx('details')}>
                        <div className={cx('details__left')}>
                            <h2 className={cx('details__title')}>This is Title</h2>
                            <div className={cx('details__view')}>1000 views</div>
                            <div className={cx('details__desc')}>This is desc of this video</div>
                        </div>
                        <div className={cx('details__right')}>
                            <div className={cx('details__tags')}>
                                <span className={cx('details__label')}>Alternative Titles:</span>
                                <span className={cx('details__tag-item')}>
                                    <Link to="#!">Another Title</Link>
                                </span>
                            </div>
                            <div className={cx('details__tags')}>
                                <span className={cx('details__label')}>Genres:</span>
                                <span className={cx('details__tag-item')}>
                                    <Link to="#!">Big Boob</Link>
                                </span>
                                <span className={cx('details__tag-item')}>
                                    <Link to="#!">Ahegao</Link>
                                </span>
                                <span className={cx('details__tag-item')}>
                                    <Link to="#!">Fantasy</Link>
                                </span>
                                <span className={cx('details__tag-item')}>
                                    <Link to="#!">Loli</Link>
                                </span>
                            </div>
                            <div className={cx('details__tags')}>
                                <span className={cx('details__label')}>Tags:</span>
                                <span className={cx('details__tag-item')}>
                                    <Link to="#!">Another Title</Link>
                                </span>
                            </div>
                            <div className={cx('details__tags')}>
                                <span className={cx('details__label')}>Studios:</span>
                                <span className={cx('details__tag-item')}>
                                    <Link to="#!">Manjin</Link>
                                </span>
                            </div>
                            <div className={cx('details__tags')}>
                                <span className={cx('details__label')}>Release:</span>
                                <span className={cx('details__tag-item')}>
                                    <Link to="#!">2023</Link>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* list */}

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
