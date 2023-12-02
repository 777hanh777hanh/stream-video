import { forwardRef, useState } from 'react';
import { useClassNames } from '~/hooks';
import images from '~assets/images';
import styles from './Image.module.scss';

const Image = ({ src, alt, className, fallback = images.noImage, ...props }: any, ref: any) => {
    const cx = useClassNames(styles);

    const [_fallback, _setFallback] = useState('');

    const handleError = () => {
        _setFallback(fallback);
    };
    return (
        <img
            className={cx('wrapper', className)}
            src={_fallback || src}
            alt={alt}
            {...props}
            ref={ref}
            onError={handleError}
        />
    );
};

export default forwardRef(Image);
