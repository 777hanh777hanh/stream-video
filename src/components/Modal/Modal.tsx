import { memo, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { useClassNames } from '~/hooks';
import style from './Modal.module.scss';
import ModalContent from './ModalContent';
// import { useDebounce } from '~/hooks';

const Modal = ({ data, children }: { data?: any; className?: any; children?: any }): any => {
    const cx = useMemo(() => useClassNames(style), []);
    const [isHover, setIsHover] = useState(false);
    const [isShow, setIsShow] = useState(false);

    const modalRef = useRef<any>();

    const debounce = (value: any, duration: number) => {
        const [debounceValue, setDebounceValue] = useState(value);

        useEffect(() => {
            if (value === false) {
                duration = 0;
            }
            const handler = setTimeout(() => {
                setDebounceValue(value);
            }, duration);

            return () => {
                clearTimeout(handler);
            };
        }, [value]);

        return debounceValue;
    };

    const debounceValue = debounce(isHover, 1000);

    useEffect(() => {
        setIsShow(debounceValue);
    }, [debounceValue]);

    useEffect(() => {
        const handleMouseOver = () => setIsHover(true);
        const handleMouseOut = () => setIsHover(false);

        modalRef.current?.addEventListener('mouseover', handleMouseOver);
        modalRef.current?.addEventListener('mouseout', handleMouseOut);

        return () => {
            modalRef.current?.addEventListener('mouseover', handleMouseOver);
            modalRef.current?.addEventListener('mouseout', handleMouseOut);
        };
    }, []);

    return (
        <>
            <div className={cx('modal')} ref={modalRef}>
                {children}
            </div>
            {debounceValue && <Wrapper data={data} changeIsHover={setIsHover} parentRef={modalRef} />}
        </>
    );
};

function Wrapper({ data, changeIsHover }: { parentRef?: any; changeIsHover?: any; data?: any }) {
    const cx = useMemo(() => useClassNames(style), []);
    const [isShow, setIsShow] = useState(false);
    const [count, setCount] = useState(0);
    const modalRef = useRef<any>();

    useEffect(() => {
        setTimeout(() => {
            setIsShow(true);
        }, 0);
    }, []);

    useEffect(() => {
        const handleMouseOver = () => changeIsHover(true);

        modalRef.current?.addEventListener('mouseover', handleMouseOver);
        modalRef.current?.addEventListener('mouseout', handleActive);

        return () => {
            modalRef.current?.addEventListener('mouseover', handleMouseOver);
            modalRef.current?.addEventListener('mouseout', handleActive);
        };
    }, []);

    const handleCount = (e: any) => {
        e.stopPropagation();
        setCount(count + 1);
    };

    const handleActive = () => {
        setIsShow(false);
        modalRef.current?.addEventListener(
            'transitionend',
            async () => {
                await changeIsHover(false);
            },
            { once: true },
        );
    };

    const newModal = (
        <div className={cx('modal_wrapper', { show: isShow })} onClick={handleActive} ref={modalRef}>
            <div className={cx('modal__layout')}>
                <div className={cx('content')} onClick={handleCount}>
                    <ModalContent data={data} />
                </div>
            </div>
        </div>
    );
    return ReactDOM.createPortal(newModal, document.querySelector('body')!);
}

export default memo(Modal);
