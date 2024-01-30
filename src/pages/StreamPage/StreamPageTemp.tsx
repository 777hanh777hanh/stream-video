import { useMemo, FC } from 'react';

import { useClassNames } from '~/hooks';
import style from './StreamPageTemp.module.scss';
import { navigationUtils } from '~/utils';

// video
import Button from '~/components/Button';
import { PlusIcon } from '~/assets/icons';

interface StreamPageTempProps {
    className?: string;
    data?: any;
}

const StreamPageTemp: FC<StreamPageTempProps> = () => {
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
                    <div className={cx('stream__view')}>
                        {/* Video wrapper*/}
                        <div id="stream__player" className={cx('stream__player')} tabIndex={0}>
                            <div className={cx('video')}>
                                <div className={cx('video__wrapper')}>
                                    <div className={cx('video__container')}>
                                        <iframe
                                            className={cx('video__player', 'video__player--iframe')}
                                            src="https://play.sonar-cdn.com/play/28f06c53-6191-498b-a12f-1d131382e530"
                                            frameBorder={0}
                                        ></iframe>
                                        {/* <video
                                            className={cx('video__player')}
                                            src={videoSrc}
                                            controls
                                        ></video> */}
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

                    {/* Stream CTA */}
                    <div className={cx('stream__cta')}>
                        <Button btn circle type="button" className={cx('stream__btn')} onClick={handleGoBack}>
                            <PlusIcon />
                        </Button>
                        <Button btn circle type="button" className={cx('stream__btn')}>
                            <PlusIcon />
                        </Button>
                        <Button btn circle type="button" className={cx('stream__btn')}>
                            <PlusIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StreamPageTemp;
