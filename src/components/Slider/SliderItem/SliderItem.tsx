import { useMemo, memo, forwardRef } from 'react';

import { useClassNames } from '~/hooks';
import style from './SliderItem.module.scss';

const SliderItem = (
    { children, className: cusClassName }: { children: any; className?: any },
    ref: any,
): any => {
    const cx = useMemo(() => useClassNames(style), []);

    return (
        <div className={cx('slider-item', cusClassName)} ref={ref}>
            <div className={cx('content')}>{children}</div>
        </div>
    );
};

export default memo(forwardRef(SliderItem));
