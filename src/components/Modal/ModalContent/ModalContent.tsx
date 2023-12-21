import { useClassNames } from '~/hooks';
import style from './ModalContent.module.scss';
import { useMemo } from 'react';

type ModalContentProps = {
    data?: any;
    className?: string;
};

const ModalContent = ({ data, className: cusClassName }: ModalContentProps) => {
    const cx = useMemo(() => useClassNames(style), []);

    return (
        <div className={cx('wrapper', { cusClassName: cusClassName })}>
            <div className={cx('content')}>
                <div className={cx('thumb')}>
                    <img src={data.thumbnail} alt={data.title} />
                </div>
                <div className={cx('info')}>
                    <h3 className={cx('title')}>{data.title}</h3>
                </div>
            </div>
        </div>
    );
};

export default ModalContent;
