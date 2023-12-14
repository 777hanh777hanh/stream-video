import { useMemo, memo } from 'react';

import { useClassNames } from '~/hooks';
import style from './SliderItem.module.scss';

const SliderItem = ({ children }) => {
    const cx = useMemo(() => useClassNames(style), []);

    return (
        <div className={cx('slider-item')}>
            <div className={cx('content')}>{children}</div>
        </div>
    );
};

export default memo(SliderItem);
