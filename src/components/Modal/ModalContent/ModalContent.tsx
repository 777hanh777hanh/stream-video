import { useClassNames } from '~/hooks';
import style from './ModalContent.module.scss';
import { useMemo } from 'react';
import Image from '~/components/Image';
import { useNavigate } from 'react-router-dom';

type ModalContentProps = {
    data?: any;
    className?: string;
};

const ModalContent = ({ data, className: cusClassName }: ModalContentProps) => {
    const cx = useMemo(() => useClassNames(style), []);
    const navigate = useNavigate();
    console.log(data);

    const handleWatchVideo = () => {
        navigate(data.path);
    };

    return (
        <div className={cx('wrapper', { cusClassName: cusClassName })}>
            <div className={cx('content')}>
                <div className={cx('thumb')} onClick={handleWatchVideo}>
                    <Image src={data.thumbnail} alt={data.title} />
                </div>
                <div className={cx('info')}>
                    <h3 className={cx('title')}>{data.title}</h3>
                    <p className={cx('view')}>{data.views}</p>
                </div>
                <div className={cx('cta')}></div>
            </div>
        </div>
    );
};

export default ModalContent;
