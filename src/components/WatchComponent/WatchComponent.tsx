import { memo, useMemo, useEffect, useState, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { useClassNames } from '~/hooks';
import style from './WatchComponent.module.scss';
import { routes } from '~/routes';
import Image from '~components/Image';

const WatchComponent = () => {
    const cx = useMemo(() => useClassNames(style), []);

    const [isShow, setIsShow] = useState(false);

    const overlayRef = useRef<any>();
    const { wrapperRef, currentScroll } = useOutletContext<any>();

    const navigate = useNavigate();

    const navigateToHomePage = useMemo(
        () => () => {
            setIsShow(false);
            overlayRef.current.addEventListener(
                'transitionend',
                () => {
                    wrapperRef.current.removeAttribute('style');
                    wrapperRef.current.style.position = 'static';
                    wrapperRef.current.removeAttribute('tabindex');
                    wrapperRef.current.style.zIndex = ``;

                    window.scrollTo(0, currentScroll);
                    navigate(routes.home);
                },
                { once: true },
            );
        },
        [],
    );

    useEffect(() => {
        wrapperRef.current.setAttribute('tabindex', '-1');
        const parentOffsetTop = wrapperRef.current.getBoundingClientRect().top;
        // const parentOffsetLeft = wrapperRef.current.getBoundingClientRect().left;
        // const parentOffsetRight = wrapperRef.current.getBoundingClientRect().right;

        wrapperRef.current.style.position = 'fixed';
        wrapperRef.current.style.top = `${parentOffsetTop}px`;
        // wrapperRef.current.style.left = `${parentOffsetLeft}px`;
        // wrapperRef.current.style.right = `${parentOffsetRight}px`;
        wrapperRef.current.style.zIndex = `0`;

        setTimeout(() => {
            setIsShow(true);

            // scroll to top
            window.scrollTo(0, 0);
        }, 10);
    }, []);

    return (
        <div className={cx('watch')} tabIndex={1}>
            <div className={cx('overlay', { show: isShow })} ref={overlayRef} onClick={navigateToHomePage}>
                <div className={cx('container')}>
                    <div className={cx('thumb')}>
                        <Image src="https://i.ytimg.com/vi/1La4QzGeaaQ/maxresdefault.jpg" alt="thumb" />
                    </div>
                    <div className={cx('info')}>
                        <h3 className={cx('title')}>title</h3>
                        <p className={cx('description')}>description</p>
                    </div>
                    <button>Click</button>
                </div>
            </div>
        </div>
    );
};

export default memo(WatchComponent);
