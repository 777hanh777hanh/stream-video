import { memo, useMemo, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useClassNames } from '~/hooks';
import style from './WatchComponent.module.scss';
import Image from '~components/Image';
import { routes } from '~/routes';

const WatchComponent = () => {
    const cx = useMemo(() => useClassNames(style), []);

    const [isShow, setIsShow] = useState(false);

    const overlayRef = useRef<any>();

    const navigate = useNavigate();

    // const params = useParams();
    // console.log(params);

    const navigateToHomePage = useMemo(
        () => () => {
            setIsShow(false);
            overlayRef.current?.addEventListener(
                'transitionend',
                () => {
                    navigate(routes.home);
                },
                { once: true },
            );
        },
        [],
    );

    useEffect(() => {
        setTimeout(() => {
            setIsShow(true);
        }, 10);
    }, []);

    return (
        <div className={cx('watch')}>
            <div className={cx('overlay', { show: isShow })} onClick={navigateToHomePage} ref={overlayRef}>
                <div className={cx('container')}>
                    <div className={cx('thumb')}>
                        <Image
                            className={cx('img')}
                            src="https://i.ytimg.com/vi/5qap5aO4i9A/maxresdefault.jpg"
                            alt="title"
                        />
                    </div>
                    <div className={cx('thumb')}>
                        <Image
                            className={cx('img')}
                            src="https://i.ytimg.com/vi/5qap5aO4i9A/maxresdefault.jpg"
                            alt="title"
                        />
                    </div>
                    <div className={cx('thumb')}>
                        <Image
                            className={cx('img')}
                            src="https://i.ytimg.com/vi/5qap5aO4i9A/maxresdefault.jpg"
                            alt="title"
                        />
                    </div>
                    <div className={cx('info')}>
                        <h3 className={cx('title')}>title</h3>
                        <p className={cx('description')}>description</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(WatchComponent);
