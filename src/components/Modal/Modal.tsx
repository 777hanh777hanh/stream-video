import { memo, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { useClassNames } from '~/hooks';
import style from './Modal.module.scss';
import ModalContent from './ModalContent';

const Modal = ({ data, children }: { data?: any; className?: any; children?: any }): any => {
    const cx = useMemo(() => useClassNames(style), []);
    const [isHover, setIsHover] = useState(false);
    const [_, setIsShow] = useState(false);

    const modalRef = useRef<any>();

    // debounce function for delay time to show modal
    const debounce = (value: any, duration: number) => {
        const [debounceValue, setDebounceValue] = useState(value);

        useEffect(() => {
            // if value == false, set duration value = 0
            if (value === false) {
                duration = 0;
            }

            // after duration time to set debounce value
            const handler = setTimeout(() => {
                setDebounceValue(value);
            }, duration);

            // cleanup setTimeout
            return () => {
                clearTimeout(handler);
            };
        }, [value]);

        return debounceValue;
    };

    const debounceValue = debounce(isHover, 700);

    useEffect(() => {
        setIsShow(debounceValue);
    }, [debounceValue]);

    useEffect(() => {
        const handleMouseOver = () => {
            return setIsHover(true);
        };
        const handleMouseOut = () => {
            return setIsHover(false);
        };

        // add Listener to hover item
        modalRef.current?.addEventListener('mouseover', handleMouseOver);
        modalRef.current?.addEventListener('mouseout', handleMouseOut);

        // cleanup Listener
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
            {debounceValue && (
                <Portal data={data} changeIsHover={setIsHover} parentRef={modalRef} scaleValue={1.5} />
            )}
        </>
    );
};

// Portal
interface PortalTypes {
    data?: any;
    changeIsHover?: any;
    parentRef?: any;
    scaleValue?: number | undefined;
}

function Portal({ data, changeIsHover, parentRef, scaleValue = 1 }: PortalTypes) {
    const cx = useMemo(() => useClassNames(style), []);
    const [isShow, setIsShow] = useState(false);
    const modalRef = useRef<any>();

    // show Portal
    useEffect(() => {
        setPortalPosition();
        setTimeout(() => {
            setIsShow(true);
        }, 0);
    }, []);

    // add Listener hover for Portal
    useEffect(() => {
        const handleMouseOver = () => changeIsHover(true);

        modalRef.current?.addEventListener('mouseover', handleMouseOver);
        modalRef.current?.addEventListener('mouseenter', handleMouseOver);
        modalRef.current?.addEventListener('mouseout', handleOutSidePortal);

        return () => {
            modalRef.current?.addEventListener('mouseenter', handleMouseOver);
            modalRef.current?.addEventListener('mouseover', handleMouseOver);
            modalRef.current?.addEventListener('mouseout', handleOutSidePortal);
        };
    }, []);

    // set Position of portal by the parent Element
    const setPortalPosition = () => {
        const parent = parentRef.current;
        const { top, left, width, height } = parent.getBoundingClientRect();

        // calculate width and height after scale
        const modalWidth = width * scaleValue;
        const modalHeight = height * scaleValue;

        // set width, height and position for Portal after scale
        modalRef.current.style.width = `${modalWidth}px`;
        modalRef.current.style.height = `${modalHeight}px`;
        modalRef.current.style.top = `${top + window.scrollY + height / 2}px`;
        modalRef.current.style.left = `${left + window.scrollX + width / 2}px`;
    };

    // handle mouse out side portal
    const handleOutSidePortal = () => {
        // set isShow => false for add animation zoom-out
        setIsShow(false);

        // after transition completed change isHover => false
        modalRef.current?.addEventListener(
            'transitionend',
            async () => {
                await changeIsHover(false);
            },
            { once: true },
        );
    };

    const newModal = (
        <div className={cx('modal_wrapper', { show: isShow })} ref={modalRef}>
            <div className={cx('modal__layout')}>
                <div className={cx('content')}>
                    <ModalContent data={data} />
                </div>
            </div>
        </div>
    );
    return ReactDOM.createPortal(newModal, document.querySelector('body')!);
}

export default memo(Modal);
