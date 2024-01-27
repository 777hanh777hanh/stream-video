import { useMemo, FC } from 'react';

import { useClassNames } from '~/hooks';
import style from './StreamPage.module.scss';
import { navigationUtils } from '~/utils';

// video
import videoSrc from '~/assets/videos/video-temp.mp4';

interface StreamPageProps {
    className?: string;
    data?: any;
}

const StreamPage: FC<StreamPageProps> = () => {
    const cx = useMemo(() => useClassNames(style), []);
    // const iframeRef = useRef<any>();

    const goBack = navigationUtils.goBackPublic();

    const handleGoBack = (e: { preventDefault: () => void; stopPropagation: () => void }) => {
        e.preventDefault();
        e.stopPropagation();
        goBack(getSlugOfVideo());
    };

    const getSlugOfVideo = () => {
        const l = window.location;
        let p = l.pathname;
        if (p.endsWith('/')) {
            p = p.substring(0, p.length - 1);
        }
        return p.split('/').pop();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('stream')}>
                <div className={cx('stream__container')}>
                    <div id="player" className={cx('stream__player')} tabIndex={0}>
                        {/* Video */}
                        <div className={cx('video__wrapper')}>
                            <div className={cx('video__container')}>
                                {/* <iframe
                                    ref={iframeRef}
                                    className={cx('video__player')}
                                    src="https://play.sonar-cdn.com/play/28f06c53-6191-498b-a12f-1d131382e530"
                                    frameBorder={0}
                                ></iframe> */}
                                <video className={cx('video__player')} src={videoSrc} controls></video>
                            </div>
                        </div>

                        {/* Overlay */}
                        <div className={cx('overlay')}>
                            {/* controller */}
                            <div className={cx('overlay__controller')}>
                                {/* click to overlay to to play/pause video */}
                                <div className={cx('overlay__controller-top')}>
                                    <div className={cx('overlay__controller-top__left')}>
                                        {/* go back */}
                                        <div className={cx('overlay__go-back')}>
                                            {/* button go back */}
                                            <button type="button" onClick={handleGoBack}>
                                                Go Back
                                            </button>
                                        </div>
                                    </div>
                                    <div className={cx('overlay__controller-top__right')}>RIGHT</div>
                                </div>
                                <div className={cx('overlay__controller-bottom')}>
                                    <div className={cx('progress__container')}>
                                        {/* Progress bar of video */}
                                        <div className={cx('progress__container__bar')}></div>

                                        {/* Duration of video */}
                                        <div className={cx('progress__container__time')}>
                                            <span className={cx('progress__container__time--text')}>
                                                {/* Timer-text */}
                                                00:00
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('controller__container')}>
                                        <div className="controller__container-left">
                                            {/* play / pause */}

                                            {/* back: -10s */}

                                            {/* next: +10s */}

                                            {/* volume */}
                                        </div>
                                        <div className="controller__container-center">
                                            {/* Video title */}
                                            <span className={cx('video__title')}>Video Title</span>
                                        </div>
                                        <div className="controller__container-right">
                                            {/* Next episode */}

                                            {/* show Playlist */}

                                            {/* speed */}

                                            {/* Fullscreen */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Overlay Info => visible if video pause and after 5s */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StreamPage;
