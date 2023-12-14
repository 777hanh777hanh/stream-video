import { memo, useMemo } from 'react';

import { useClassNames } from '~/hooks';
import style from './Slider.module.scss';
import { ChevronIcon } from '~/assets/icons';

const Slider = ({ className: cusClassName, children }: { className?: any; children?: any }): any => {
    const cx = useMemo(() => useClassNames(style), []);
    const pages = 3;

    const renderPagination = Array.from({ length: pages }, (_, i) => {
        return <div key={i} className={cx('page', { active: i === pages - 1 })}></div>;
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider', cusClassName)}>
                <div className={cx('pagination')}>{pages > 1 && renderPagination}</div>
                <div className={cx('slider-cta')}>
                    <div className={cx('slider-btn', 'slider-prev')}>
                        <ChevronIcon />
                    </div>
                    <div className={cx('slider-btn', 'slider-next')}>
                        <ChevronIcon className={cx('icon')} />
                    </div>
                </div>
                <div className={cx('slider-list')}>{children}</div>
            </div>
        </div>
    );
};

export default memo(Slider);
