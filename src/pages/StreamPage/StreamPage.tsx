import { useMemo, FC } from 'react';

import { useClassNames } from '~/hooks';
import style from './StreamPage.module.scss';

const StreamPage: FC = () => {
    const cx = useMemo(() => useClassNames(style), []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('stream')}>
                <div className={cx('stream__container')}>
                    <div id="player" className={cx('stream__player')} tabIndex={0}>
                        {/* Video */}
                        <div className="video__container">
                            <video src="#!" tabIndex={-1}></video>
                        </div>

                        {/* Overlay */}
                        <div className={cx('overlay')}>
                            {/* controller */}
                            <div className={cx('overlay__controller')}>
                                {/* click to overlay to to play/pause video */}
                                <div className={cx('overlay__controller-top')}>
                                    <div className={cx('overlay__controller-top__left')}>
                                        {/* go back */}
                                        <div className={cx('overlay__go-back')}>{/* button go back */}</div>
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
